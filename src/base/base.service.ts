import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseEntity } from './base.entity';
import { BaseRepository } from './base.repository';
import { IBaseService } from './ibase.service';

@Injectable()
export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(private readonly genericRepository: BaseRepository<T>) {}

  async create(model): Promise<T> {
    return this.genericRepository.create(model);
  }

  async updateOne(id: string, model): Promise<T> {
    return this.genericRepository.updateOne(id, model);
  }

  async delete(id: string) {
    const model = await this.genericRepository.findById(id);
    if (model) {
      return this.genericRepository.remove(id);
    }

    throw new NotFoundException('Item with id: ' + id + ' not found');
  }

  async findAll(filter): Promise<T[]> {
    return await this.genericRepository.findAll(filter);
  }

  async getItemById(id: string): Promise<T> {
    const model = await this.genericRepository.findById(id);
    if (model) {
      return model;
    }
    throw new NotFoundException('Item with id: ' + id + ' not found');
  }
  async getItemByQuery(query): Promise<T[]> {
    const model = await this.genericRepository.findAll(query);
    return model;
  }
}
