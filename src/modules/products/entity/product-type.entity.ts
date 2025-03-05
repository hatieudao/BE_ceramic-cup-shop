import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { Product } from './product.entity';
import { PRODUCT_TYPE_ENTITY } from '../../../constant';
import { OrderItem } from '../../order-items/order-item.entity';

@Entity({ name: PRODUCT_TYPE_ENTITY })
export class ProductType extends BaseEntity {
  @ManyToOne(() => Product, (product) => product.productTypes, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.productType)
  orderItems: OrderItem[];

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;
}
