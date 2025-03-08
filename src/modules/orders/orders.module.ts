import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { Order } from './entity/order.entity';
import { OrderItem } from '../order-items/order-item.entity';
import { CartsModule } from '../carts/carts.module';
import { ProductsModule } from '../products/products.module';
import { Address } from './entity/address.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Address]),
    CartsModule,
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
