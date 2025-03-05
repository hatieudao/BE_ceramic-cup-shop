import { Entity, Column, ManyToOne } from 'typeorm';
import { Order } from '../orders/order.entity';
import { ORDER_ITEM_ENTITY } from '../../constant';
import { BaseEntity } from '../../base/base.entity';
import { ProductType } from '../products/entity/product-type.entity';

export interface IOrderItem {
  orderId: string;
  productTypeId: string;
  quantity: number;
  price: number;
}

@Entity({ name: ORDER_ITEM_ENTITY })
export class OrderItem extends BaseEntity implements IOrderItem {
  @Column({ name: 'order_id' })
  orderId: string;

  @Column({ name: 'product_type_id' })
  productTypeId: string;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => ProductType, (productType) => productType.orderItems)
  productType: ProductType;
}
