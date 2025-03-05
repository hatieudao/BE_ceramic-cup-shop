import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CART_ITEM_ENTITY } from '../../../constant';
import { ProductType } from '../../products/entity/product-type.entity';
import { Cart } from './cart.entity';
import { BaseEntity } from '../../../base/base.entity';

@Entity(CART_ITEM_ENTITY)
export class CartItem extends BaseEntity {
  @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  @ApiProperty({ description: 'Cart', type: () => Cart })
  cart: Cart;

  @Column({ name: 'cart_id', type: 'char', length: 36 })
  @ApiProperty({ description: 'Cart ID', type: String, format: 'uuid' })
  cartId: string;

  @ManyToOne(() => ProductType)
  @JoinColumn({ name: 'product_type_id' })
  @ApiProperty({ description: 'Product Type', type: () => ProductType })
  productType: ProductType;

  @Column({ name: 'product_type_id', type: 'char', length: 36 })
  @ApiProperty({ description: 'Product Type ID', type: String, format: 'uuid' })
  productTypeId: string;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'Quantity', type: Number })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({ description: 'Price', type: Number })
  price: number;
}
