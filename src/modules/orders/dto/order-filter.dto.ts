import { IsOptional, IsEnum, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../entity/order.entity';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class OrderFilterDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  @ApiProperty({ required: false, enum: OrderStatus })
  status?: OrderStatus;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ required: false, type: Number })
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ required: false, type: Number })
  maxPrice?: number;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiProperty({ required: false, enum: SortOrder })
  sortByCreatedAt?: SortOrder;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ required: false, type: Number, default: 1 })
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ required: false, type: Number, default: 10 })
  limit?: number = 10;
}
