import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../base/base.entity';
import { CART_ENTITY } from '../../../constant';
import { CartItem } from './cart-item.entity';

@Entity(CART_ENTITY)
export class Cart extends BaseEntity {
  @Column({ name: 'user_id', type: 'char', length: 36, nullable: true })
  @ApiProperty({ description: 'User ID', type: String, format: 'uuid' })
  userId: string;

  @Column({ name: 'total_item', type: 'int', default: 0 })
  @ApiProperty({
    description: 'Total number of items in the cart',
    type: Number,
  })
  totalItem: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  @ApiProperty({ type: () => [CartItem] })
  cartItems: CartItem[];
}
