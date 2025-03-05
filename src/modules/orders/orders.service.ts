import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CartsService } from '../carts/carts.service';
import { ProductTypesRepository } from '../products/product-types.repository';
import { Order } from './order.entity';
import { Cart } from '../carts/entity/cart.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly cartsService: CartsService,
    private readonly productTypesRepository: ProductTypesRepository,
  ) {}

  async submitOrder(userId: string): Promise<Order> {
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
    );

    // Update product stock
    await this.updateProductStock(cart.data);

    // Clear cart
    for (const item of cart.data.cartItems) {
      await this.cartsService.removeCartItem(userId, item.id);
    }

    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.ordersRepository.findAllOrders();
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
}
