import { Injectable, NotFoundException } from '@nestjs/common';
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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductTypesRepository } from './product-types.repository';
import { AdminProductFilterDto } from './dto/admin-product-filter.dto';
import { PaginatedAdminProductResponse } from './types/admin-product-response.types';

const ADMIN_PRODUCT_CACHE_PREFIX = 'admin_products';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly productTypesRepository: ProductTypesRepository,
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

  async getAdminProducts(
    filterDto: AdminProductFilterDto,
  ): Promise<PaginatedAdminProductResponse> {
    const cacheKey = `${ADMIN_PRODUCT_CACHE_PREFIX}:${JSON.stringify(filterDto)}`;

    try {
      const cachedData = await this.redis.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData) as PaginatedAdminProductResponse;
      }

      const products = await this.productRepository.getAdminProducts(filterDto);

      await this.redis.set(
        cacheKey,
        JSON.stringify(products),
        'EX',
        REDIS_EXPIRATION_TIME.PRODUCT_CACHE + randomNumber(60 * 15, 60 * 30),
      );

      return products;
    } catch (error) {
      // If there's any Redis error, just return the data without caching
      return this.productRepository.getAdminProducts(filterDto);
    }
  }

  async invalidateAdminProductCache(): Promise<void> {
    try {
      const keys = await this.redis.keys(`${ADMIN_PRODUCT_CACHE_PREFIX}:*`);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      console.error('Error invalidating admin product cache:', error);
    }
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.createProduct({
      name: createProductDto.name,
      description: createProductDto.description,
    });
    for (const pt of createProductDto.productTypes) {
      await this.productTypesRepository.createProductType({
        name: pt.name,
        description: pt.description || '',
        price: Number(pt.price) || 0,
        stock: Number(pt.stock) || 0,
        imageUrl: pt.imageUrl || '',
        product: product,
        orderItems: [],
      });
    }

    await Promise.all([
      this.invalidateProductCache(),
      this.invalidateAdminProductCache(),
    ]);
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    // Update main product fields
    if (updateProductDto.name) product.name = updateProductDto.name;
    if (updateProductDto.description)
      product.description = updateProductDto.description;

    // Handle product types
    if (updateProductDto.productTypes) {
      // Remove existing product types
      await Promise.all(
        product.productTypes.map((pt) =>
          this.productTypesRepository.remove(pt.id),
        ),
      );
      // Create new product types
      await Promise.all(
        updateProductDto.productTypes.map((type) =>
          this.productTypesRepository.createProductType({
            name: type.name,
            description: type.description || '',
            price: Number(type.price) || 0,
            stock: Number(type.stock) || 0,
            imageUrl: type.imageUrl || '',
            product: product,
            orderItems: [],
          }),
        ),
      );
    }

    const updatedProduct = await this.productRepository.save(product);
    await Promise.all([
      this.invalidateProductCache(),
      this.invalidateAdminProductCache(),
    ]);

    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    await this.productRepository.deleteProduct(id);
    await Promise.all([
      this.invalidateProductCache(),
      this.invalidateAdminProductCache(),
    ]);
  }
}
