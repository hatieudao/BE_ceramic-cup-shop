import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CartsService } from '../carts/carts.service';
import { ProductTypesRepository } from '../products/product-types.repository';
import { Order, OrderStatus } from './entity/order.entity';
import { Cart } from '../carts/entity/cart.entity';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { OrderFilterDto } from './dto/order-filter.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import {
  REDIS_EXPIRATION_TIME,
  REDIS_KEYS,
} from '../../constant/redis-keys.constant';
import { randomNumber } from '../../utils/random';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE_QUEUE_SERVICE } from '../../constant/rabitmq.constant';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../authentication/users/users.service';
import { CREATE_ORDER } from '../../constant/rabitmq.constant';

@Injectable()
export class OrdersService implements OnModuleInit {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly cartsService: CartsService,
    private readonly productTypesRepository: ProductTypesRepository,
    @InjectRedis() private readonly redis: Redis,
    @Inject(MESSAGE_QUEUE_SERVICE)
    private readonly notificationClient: ClientProxy,
    private readonly usersService: UsersService,
  ) {}

  async onModuleInit() {
    try {
      this.logger.log('Connecting to RabbitMQ...');
      await this.notificationClient.connect();
      this.logger.log('Successfully connected to RabbitMQ');
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ:', error);
      throw error;
    }
  }

  async submitOrder(
    userId: string,
    addressData: CreateAddressDto,
  ): Promise<Order> {
    // Get user's cart
    const cart = await this.cartsService.getOrCreateCart(userId);
    if (!cart.data.cartItems || cart.data.cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Check stock availability for all items
    await this.checkStockAvailability(cart.data);

    // Create order from cart items
    const order = await this.ordersRepository.createOrder(
      userId,
      cart.data.cartItems,
      addressData,
    );

    // Update product stock
    await this.updateProductStock(cart.data);

    // Clear cart
    for (const item of cart.data.cartItems) {
      await this.cartsService.removeCartItem(userId, item.id);
    }

    // Send notification asynchronously
    this.sendOrderNotification(
      CREATE_ORDER,
      order.id,
      userId,
      OrderStatus.PENDING,
    )
      .then(() => {
        this.logger.log(
          `Order notification sent successfully for order ${order.id}`,
        );
      })
      .catch((error) => {
        this.logger.error(
          `Failed to send order notification for order ${order.id}:`,
          error,
        );
      });

    return order;
  }

  private async sendOrderNotification(
    event: string,
    orderId: string,
    userId: string,
    status: OrderStatus,
  ): Promise<void> {
    try {
      const user = await this.usersService.getItemById(userId);
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      await firstValueFrom(
        this.notificationClient.emit(event, {
          email: user.email,
          orderId,
          status,
        }),
      );
    } catch (error) {
      this.logger.error(
        `Failed to send notification for order ${orderId}:`,
        error,
      );
      // You might want to implement a retry mechanism or queue the notification for later
      throw error;
    }
  }

  async getAllOrders(filterDto: OrderFilterDto) {
    return this.ordersRepository.findAllOrders(filterDto);
  }

  async getUserOrders(userId: string, filterDto: OrderFilterDto) {
    const orders = await this.ordersRepository.findUserOrders(
      userId,
      filterDto,
    );
    return orders;
  }

  private async checkStockAvailability(cart: Cart): Promise<void> {
    for (const item of cart.cartItems) {
      const productType = await this.productTypesRepository.findById(
        item.productTypeId,
      );
      if (!productType) {
        throw new NotFoundException(
          `Product type with id ${item.productTypeId} not found`,
        );
      }
      if (productType.stock < item.quantity) {
        throw new BadRequestException(
          `Not enough stock for product ${productType.name}. Available: ${productType.stock}, Requested: ${item.quantity}`,
        );
      }
    }
  }

  private async updateProductStock(cart: Cart): Promise<void> {
    for (const item of cart.cartItems) {
      const productType = await this.productTypesRepository.findById(
        item.productTypeId,
      );
      if (productType) {
        await this.productTypesRepository.updateStock(
          item.productTypeId,
          productType.stock - item.quantity,
        );
      }
    }
  }

  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
  ): Promise<Order> {
    const order = await this.ordersRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    order.status = status;
    await this.ordersRepository.save(order);

    await firstValueFrom(
      this.notificationClient.emit('order_updated', {
        userId: order.userId,
        orderId: order.id,
        status,
      }),
    );
    return order;
  }

  async cancelOrder(orderId: string, userId: string): Promise<Order> {
    const order = await this.ordersRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    // Check if the user owns this order
    if (order.userId !== userId) {
      throw new BadRequestException('You can only cancel your own orders');
    }

    // Check if the order can be canceled
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Only pending orders can be canceled');
    }

    // Cancel the order
    order.status = OrderStatus.CANCELED;
    await this.ordersRepository.save(order);

    // Invalidate order cache
    await this.invalidateOrderCache(userId);

    // Send notification
    this.notificationClient.emit('order_updated', {
      userId: order.userId,
      orderId: order.id,
      status: OrderStatus.CANCELED,
    });

    return order;
  }

  private async invalidateOrderCache(
    userId: string,
    filterDto?: OrderFilterDto,
  ) {
    const cacheKey = `${REDIS_KEYS.ORDER_CACHE}:${userId}:${filterDto ? JSON.stringify(filterDto) : '*'}`;
    await this.redis.del(cacheKey);
  }
}
