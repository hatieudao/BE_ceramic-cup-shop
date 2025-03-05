import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { CartsRepository } from './carts.repository';
import { Cart } from './entity/cart.entity';
import { CartItem } from './entity/cart-item.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem]), ProductsModule],
  controllers: [CartsController],
  providers: [CartsService, CartsRepository],
  exports: [CartsService],
})
export class CartsModule {}
