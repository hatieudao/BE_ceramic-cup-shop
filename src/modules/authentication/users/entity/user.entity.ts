import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../../base/base.entity';
import { USER_ENTITY } from '../../../../constant';
import { Order } from '../../../orders/order.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
  createdAt: Date;
  isAdmin: boolean;
}

@Entity({ name: USER_ENTITY })
export class User extends BaseEntity implements IUser {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken?: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
