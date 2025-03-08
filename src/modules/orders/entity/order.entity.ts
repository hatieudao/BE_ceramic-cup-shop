import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
// import { Payment } from '../../payment/entity/payment.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../base/base.entity';
import { ORDER_ENTITY } from '../../../constant';
import { User } from '../../authentication/users/entity/user.entity';
import { OrderItem } from '../../order-items/order-item.entity';
import { Address } from './address.entity';

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export interface IOrder {
  id: string;
  userId: string;
  status: OrderStatus;
  totalPrice: number;
  createdAt: Date;
}

@Entity({ name: ORDER_ENTITY })
export class Order extends BaseEntity implements IOrder {
  @Column({ name: 'user_id', type: 'char', length: 36, nullable: true })
  @ApiProperty({ description: 'User ID', type: String, format: 'uuid' })
  userId: string;

  // @Column({ name: 'payment_id', nullable: true })
  // @ApiProperty({ description: 'Payment ID', type: String, format: 'uuid' })
  // paymentId?: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending',
  })
  @ApiProperty({
    description: 'Order status',
    enum: ['pending', 'completed', 'canceled'],
  })
  status: OrderStatus;

  @Column({ name: 'delivery_address_id' })
  @ApiProperty({
    description: 'Delivery address ID',
    type: String,
    format: 'uuid',
  })
  deliveryAddressId: string;

  @Column({
    name: 'delivery_charge',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 10,
  })
  @ApiProperty({
    description: 'Delivery charge',
    type: 'number',
  })
  deliveryCharge: number;

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({
    description: 'Total price',
    type: 'number',
  })
  totalPrice: number;

  @Column({ name: 'order_note', type: 'text', nullable: true })
  @ApiProperty({ description: 'Order note', type: 'string' })
  orderNote?: string;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ description: 'User' })
  user: Promise<User>;

  // @ManyToOne(() => Payment)
  // @JoinColumn({ name: 'payment_id' })
  // @ApiProperty({ description: 'Payment' })
  // payment?: Payment;

  @ManyToOne(() => Address, { lazy: true })
  @JoinColumn({ name: 'delivery_address_id' })
  @ApiProperty({ description: 'Delivery address' })
  deliveryAddress: Promise<Address>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { lazy: true })
  @ApiProperty({ description: 'Order items' })
  orderItems: Promise<OrderItem[]>;
}
