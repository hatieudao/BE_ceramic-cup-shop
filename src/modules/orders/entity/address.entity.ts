import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../authentication/users/entity/user.entity';
import { ADDRESS_ENTITY } from '../../../constant';
import { BaseEntity } from '../../../base/base.entity';

@Entity({ name: ADDRESS_ENTITY })
export class Address extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'address_line1' })
  addressLine1: string;

  @Column({ name: 'address_line2', nullable: true })
  addressLine2?: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ name: 'postal_code' })
  postalCode: string;

  @Column()
  country: string;

  @Column()
  phone: string;

  @Column({ name: 'is_default', default: false })
  isDefault: boolean;

  @Column({
    name: 'address_name',
    type: 'enum',
    enum: ['work', 'home', 'other'],
    default: 'other',
  })
  addressName: 'work' | 'home' | 'other';

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
