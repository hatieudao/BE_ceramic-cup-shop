import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ProductFilterDto } from './dto/product-filter.dto';
import { ProductsRepository } from './products.repository';
import { InjectRedis } from '@nestjs-modules/ioredis';
import {
  REDIS_EXPIRATION_TIME,
  REDIS_KEYS,
} from '../../constant/redis-keys.constant';
import { Product } from './entity/product.entity';
import { randomNumber } from '../../utils/random';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async findAll(filterDto: ProductFilterDto) {
    const cacheKey = `${REDIS_KEYS.PRODUCT_CACHE}:${JSON.stringify(filterDto)}`;
    const cachedProducts = await this.redis.get(cacheKey);
    if (cachedProducts) {
      try {
        return JSON.parse(cachedProducts) as Product[];
      } catch (error) {
        console.error('Error parsing cached products:', error);
        await this.invalidateProductCache();
      }
    }
    const products = await this.productRepository.getProducts(filterDto);
    await this.redis.set(
      cacheKey,
      JSON.stringify(products),
      'EX',
      REDIS_EXPIRATION_TIME.PRODUCT_CACHE + randomNumber(60 * 15, 60 * 30),
    );
    return products;
  }

  async findOne(id: string) {
    return this.productRepository.findOne(id);
  }
  async invalidateProductCache() {
    const keys = await this.redis.keys(`${REDIS_KEYS.PRODUCT_CACHE}:*`);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}
