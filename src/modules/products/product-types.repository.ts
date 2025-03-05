import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../base/base.repository';
import { Repository } from 'typeorm';
import { ProductType } from './entity/product-type.entity';

@Injectable()
export class ProductTypesRepository extends BaseRepository<ProductType> {
  constructor(
    @InjectRepository(ProductType)
    private readonly typeormRepository: Repository<ProductType>,
  ) {
    super(typeormRepository);
  }
  async updateStock(id: string, stock: number): Promise<void> {
    await this.typeormRepository.update(id, { stock });
  }
}
