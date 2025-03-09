import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { PRODUCT_ENTITY, PRODUCT_TYPE_ENTITY } from '../../constant';
import { ProductFilterDto } from './dto/product-filter.dto';
import {
  PaginatedProductResponse,
  ProductResponse,
  RawProductResult,
} from './types/product-response.types';
import { AdminProductFilterDto } from './dto/admin-product-filter.dto';
import { PaginatedAdminProductResponse } from './types/admin-product-response.types';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const product = this.repository.create(productData);
    return await this.repository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.repository
      .createQueryBuilder(PRODUCT_ENTITY)
      .leftJoinAndSelect(`${PRODUCT_ENTITY}.productTypes`, PRODUCT_TYPE_ENTITY)
      .getMany();
  }

  async findOne(id: string): Promise<Product | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['productTypes'],
    });
  }

  async updateProduct(id: string, updateData: Partial<Product>): Promise<void> {
    await this.repository.update(id, updateData);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getProducts(
    filterDto: ProductFilterDto,
  ): Promise<PaginatedProductResponse> {
    const {
      name,
      minPrice,
      maxPrice,
      sortByCreatedAt,
      sortByPrice,
      page = 1,
      limit = 10,
    } = filterDto;

    const baseQuery = this.repository
      .createQueryBuilder(PRODUCT_ENTITY)
      .leftJoin(`${PRODUCT_ENTITY}.productTypes`, PRODUCT_TYPE_ENTITY)
      .select([
        `${PRODUCT_ENTITY}.id AS id`,
        `${PRODUCT_ENTITY}.name AS name`,
        `${PRODUCT_ENTITY}.description AS description`,
        `${PRODUCT_ENTITY}.createdAt AS createdAt`,
        `MIN(${PRODUCT_TYPE_ENTITY}.price) AS minPrice`,
        `MAX(${PRODUCT_TYPE_ENTITY}.price) AS maxPrice`,
        `GROUP_CONCAT(${PRODUCT_TYPE_ENTITY}.imageUrl SEPARATOR '|') AS imageUrls`,
      ])
      .groupBy(`${PRODUCT_ENTITY}.id`);

    // **Apply Filters**
    if (name) {
      baseQuery.andWhere(`${PRODUCT_ENTITY}.name LIKE :name`, {
        name: `%${name}%`,
      });
    }
    if (minPrice !== undefined) {
      baseQuery.having(`MIN(${PRODUCT_TYPE_ENTITY}.price) >= :minPrice`, {
        minPrice,
      });
    }
    if (maxPrice !== undefined) {
      baseQuery.andHaving(`MAX(${PRODUCT_TYPE_ENTITY}.price) <= :maxPrice`, {
        maxPrice,
      });
    }

    // **Sorting**
    if (sortByCreatedAt) {
      baseQuery.orderBy(`${PRODUCT_ENTITY}.createdAt`, sortByCreatedAt);
    }
    if (sortByPrice) {
      baseQuery.addOrderBy(`MIN(${PRODUCT_TYPE_ENTITY}.price)`, sortByPrice);
    }

    // **Pagination Fix using Direct Query**
    const totalCount = await baseQuery.getCount(); // Get total count before pagination

    // Execute the main query with pagination
    const products = await baseQuery
      .offset((page - 1) * limit)
      .limit(limit)
      .getRawMany<RawProductResult>();

    // **Parse and Transform Results**
    return {
      data: products.map(
        (product): ProductResponse => ({
          id: product.id,
          name: product.name,
          description: product.description,
          imageUrls: product.imageUrls ? product.imageUrls.split('|') : [],
          minPrice: Number(product.minPrice),
          maxPrice: Number(product.maxPrice),
          createdAt: new Date(product.createdAt),
        }),
      ),
      meta: {
        totalItems: totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        perPage: limit,
      },
    };
  }

  async getAdminProducts(
    filterDto: AdminProductFilterDto,
  ): Promise<PaginatedAdminProductResponse> {
    const {
      name,
      minPrice,
      maxPrice,
      sortByCreatedAt,
      sortByPrice,
      page = 1,
      limit = 10,
    } = filterDto;

    const query = this.repository
      .createQueryBuilder(PRODUCT_ENTITY)
      .leftJoinAndSelect(`${PRODUCT_ENTITY}.productTypes`, PRODUCT_TYPE_ENTITY)
      .select([
        `${PRODUCT_ENTITY}.id`,
        `${PRODUCT_ENTITY}.name`,
        `${PRODUCT_ENTITY}.description`,
        `${PRODUCT_ENTITY}.createdAt`,
        `${PRODUCT_TYPE_ENTITY}.id`,
        `${PRODUCT_TYPE_ENTITY}.name`,
        `${PRODUCT_TYPE_ENTITY}.description`,
        `${PRODUCT_TYPE_ENTITY}.price`,
        `${PRODUCT_TYPE_ENTITY}.stock`,
        `${PRODUCT_TYPE_ENTITY}.imageUrl`,
        `${PRODUCT_TYPE_ENTITY}.createdAt`,
      ]);

    if (name) {
      query.andWhere(`${PRODUCT_ENTITY}.name LIKE :name`, {
        name: `%${name}%`,
      });
    }

    if (minPrice !== undefined) {
      query.andWhere(`${PRODUCT_TYPE_ENTITY}.price >= :minPrice`, {
        minPrice,
      });
    }

    if (maxPrice !== undefined) {
      query.andWhere(`${PRODUCT_TYPE_ENTITY}.price <= :maxPrice`, {
        maxPrice,
      });
    }

    if (sortByCreatedAt) {
      query.orderBy(`${PRODUCT_ENTITY}.createdAt`, sortByCreatedAt);
    }

    if (sortByPrice) {
      query.addOrderBy(`${PRODUCT_TYPE_ENTITY}.price`, sortByPrice);
    }

    const totalCount = await query.getCount();
    const products = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      data: products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        createdAt: product.createdAt,
        productTypes: product.productTypes.map((type) => ({
          id: type.id,
          name: type.name,
          description: type.description,
          price: type.price,
          stock: type.stock,
          imageUrl: type.imageUrl,
          createdAt: type.createdAt,
        })),
      })),
      meta: {
        totalItems: totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        perPage: limit,
      },
    };
  }

  async save(product: Product): Promise<Product> {
    return await this.repository.save(product);
  }
}
