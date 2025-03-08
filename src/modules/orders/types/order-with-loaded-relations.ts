import { User } from '../../authentication/users/entity/user.entity';
import { Address } from '../entity/address.entity';
import { OrderItem } from '../entity/order-item.entity';
import { Order } from '../entity/order.entity';

export interface OrderWithLoadedRelations
  extends Omit<Order, 'user' | 'deliveryAddress' | 'orderItems'> {
  user: User;
  deliveryAddress: Address;
  orderItems: OrderItem[];
}
export interface OrderWithItems extends Omit<Order, 'orderItems'> {
  orderItems: OrderItem[];
}
