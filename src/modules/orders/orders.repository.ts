import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from '../order-items/order-item.entity';
import { CartItem } from '../carts/entity/cart-item.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async createOrder(userId: string, cartItems: CartItem[]): Promise<Order> {
    // Calculate total price from cart items
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Create order
    const order = this.orderRepository.create({
      userId,
      totalPrice,
    });
    const savedOrder = await this.orderRepository.save(order);

    // Create order items
    const orderItems = cartItems.map((cartItem) =>
      this.orderItemRepository.create({
        orderId: savedOrder.id,
        productTypeId: cartItem.productTypeId,
        quantity: cartItem.quantity,
        price: cartItem.price,
      }),
    );
    await this.orderItemRepository.save(orderItems);

    const foundOrder = await this.findOrderById(savedOrder.id);
    if (!foundOrder) {
      throw new Error('Order not found');
    }
    return foundOrder;
  }

  async findOrderById(id: string): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        orderItems: true,
        user: true,
      },
    });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: {
        orderItems: true,
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
