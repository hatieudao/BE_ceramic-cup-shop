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
import { ProductTypesModule } from '../product-types/product-types.module';
import { ClientsModule } from '@nestjs/microservices';
import { rabbitMQConfig } from '../../config/rabbitmq.config';
import { UserModule } from '../authentication/users/users.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Address]),
    CartsModule,
    ProductsModule,
    ProductTypesModule,
    ClientsModule.register(rabbitMQConfig),
    UserModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
