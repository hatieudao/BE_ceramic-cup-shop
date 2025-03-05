import { Injectable } from '@nestjs/common';
import { Product } from './entity/product.entity';
import { ProductsRepository } from './products.repository';
import { ProductFilterDto } from './dto/product-filter.dto';
import { PRODUCT_ENTITY, PRODUCT_TYPE_ENTITY } from '../../constant';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}

  async findAll(filterDto: ProductFilterDto) {
    return this.productRepository.getProducts(filterDto);
  }

  async findOne(id: string) {
    return this.productRepository.findOne(id);
  }
}
