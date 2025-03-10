import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DELIVERY_CHARGE } from '../../constant/business.contant';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { CartItem } from '../carts/entity/cart-item.entity';
import { OrderItem } from '../order-items/order-item.entity';
import { Address } from './entity/address.entity';
import { Order, OrderStatus } from './entity/order.entity';
import {
  OrderWithItems,
  OrderWithLoadedRelations,
} from './types/order-with-loaded-relations';
import { OrderFilterDto } from './dto/order-filter.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async findById(id: string): Promise<Order | null> {
    return this.orderRepository.findOne({ where: { id } });
  }

  async save(order: Order): Promise<Order> {
    return this.orderRepository.save(order);
  }

  async createOrder(
    userId: string,
    cartItems: CartItem[],
    addressData: CreateAddressDto,
  ): Promise<Order> {
    try {
      // Create delivery address first
      const address = this.addressRepository.create({
        userId,
        fullName: addressData.fullName || '',
        addressLine1: addressData.addressLine1 || '',
        addressLine2: addressData.addressLine2 || '',
        city: addressData.city || '',
        state: addressData.state || '',
        postalCode: addressData.postalCode || '',
        country: addressData.country || '',
        phone: addressData.phone || '',
        email: addressData.email || '',
        isDefault: addressData.isDefault || false,
        addressName: addressData.addressName || 'other',
      });
      const savedAddress = await this.addressRepository.save(address);

      // Calculate total price from cart items
      const totalPrice =
        cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
        DELIVERY_CHARGE;

      // Create order with address and notes
      const order = await this.orderRepository.save({
        userId,
        totalPrice,
        deliveryAddressId: savedAddress.id,
        orderNote: addressData.orderNote,
        shipToDifferentAddress: addressData.shipToDifferentAddress,
        status: OrderStatus.PENDING,
        deliveryCharge: DELIVERY_CHARGE,
      });

      // Create order items
      const orderItems = cartItems.map((cartItem) =>
        this.orderItemRepository.create({
          orderId: order.id,
          productTypeId: cartItem.productTypeId,
          quantity: cartItem.quantity,
          price: cartItem.price,
        }),
      );
      await this.orderItemRepository.save(orderItems);

      return await this.findOrderById(order.id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to create order: ${error.message}`);
      }
      throw new Error('Failed to create order: Unknown error');
    }
  }

  async findOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }

  async findAllOrders(filterDto: OrderFilterDto): Promise<{
    data: OrderWithLoadedRelations[];
    meta: {
      totalItems: number;
      currentPage: number;
      totalPages: number;
      perPage: number;
    };
  }> {
    const {
      status,
      minPrice,
      maxPrice,
      sortByCreatedAt,
      page = 1,
      limit = 10,
    } = filterDto;

    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.productType', 'productType')
      .leftJoinAndSelect('productType.product', 'product');

    // Apply filters
    if (status) {
      queryBuilder.andWhere('order.status = :status', { status });
    }
    if (minPrice !== undefined) {
      queryBuilder.andWhere('order.totalPrice >= :minPrice', { minPrice });
    }
    if (maxPrice !== undefined) {
      queryBuilder.andWhere('order.totalPrice <= :maxPrice', { maxPrice });
    }

    // Apply sorting
    if (sortByCreatedAt) {
      queryBuilder.orderBy('order.createdAt', sortByCreatedAt);
    } else {
      queryBuilder.orderBy('order.createdAt', 'DESC');
    }

    // Get total count for pagination
    const totalItems = await queryBuilder.getCount();

    // Apply pagination
    queryBuilder.skip((page - 1) * limit).take(limit);

    const orders = await queryBuilder.getMany();

    // Transform and load all relations
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => ({
        ...order,
        user: await order.user,
        deliveryAddress: await order.deliveryAddress,
        orderItems: await order.orderItems,
      })),
    );

    return {
      data: ordersWithItems,
      meta: {
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        perPage: limit,
      },
    };
  }

  async findUserOrders(
    userId: string,
    filterDto: OrderFilterDto,
  ): Promise<{
    data: OrderWithItems[];
    meta: {
      totalItems: number;
      currentPage: number;
      totalPages: number;
      perPage: number;
    };
  }> {
    const {
      status,
      minPrice,
      maxPrice,
      sortByCreatedAt,
      page = 1,
      limit = 10,
    } = filterDto;

    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.productType', 'productType')
      .leftJoinAndSelect('productType.product', 'product')
      .where('order.userId = :userId', { userId });

    // Apply filters
    if (status) {
      queryBuilder.andWhere('order.status = :status', { status });
    }
    if (minPrice !== undefined) {
      queryBuilder.andWhere('order.totalPrice >= :minPrice', { minPrice });
    }
    if (maxPrice !== undefined) {
      queryBuilder.andWhere('order.totalPrice <= :maxPrice', { maxPrice });
    }

    // Apply sorting
    if (sortByCreatedAt) {
      queryBuilder.orderBy('order.createdAt', sortByCreatedAt);
    } else {
      queryBuilder.orderBy('order.createdAt', 'DESC');
    }

    // Get total count for pagination
    const totalItems = await queryBuilder.getCount();

    // Apply pagination
    queryBuilder.skip((page - 1) * limit).take(limit);

    const orders = await queryBuilder.getMany();

    // Transform and load all relations
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => ({
        ...order,
        orderItems: await order.orderItems,
      })),
    );

    return {
      data: ordersWithItems as OrderWithItems[],
      meta: {
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        perPage: limit,
      },
    };
  }
}
