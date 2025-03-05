import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../authentication/users/entity/user.entity';
import { OrderItem } from '../order-items/order-item.entity';
import { ORDER_ENTITY } from '../../constant';
import { BaseEntity } from '../../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
