import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class ProductFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value)) // Ensure numeric conversion
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  maxPrice?: number;

  @IsOptional()
  @IsEnum(SortOrder)
  sortByCreatedAt?: SortOrder;

  @IsOptional()
  @IsEnum(SortOrder)
  sortByPrice?: SortOrder;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  limit?: number;
}
