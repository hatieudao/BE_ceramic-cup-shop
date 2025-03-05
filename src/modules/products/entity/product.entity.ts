import { BaseEntity } from '../../../base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductType } from './product-type.entity';
import { PRODUCT_ENTITY } from '../../../constant';

@Entity({ name: PRODUCT_ENTITY })
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @OneToMany(() => ProductType, (productType) => productType.product, {
    cascade: true,
  })
  productTypes: ProductType[];
}
