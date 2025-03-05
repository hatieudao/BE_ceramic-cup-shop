import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductType } from './entity/product-type.entity';
import { ProductTypesRepository } from './product-types.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductType])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, ProductTypesRepository],
  exports: [ProductsService, ProductsRepository, ProductTypesRepository],
})
export class ProductsModule {}
