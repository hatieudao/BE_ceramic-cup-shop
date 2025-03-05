import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Primary key', type: String, format: 'uuid' })
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: 'Created date', type: Date })
  createdAt: Date;
}
