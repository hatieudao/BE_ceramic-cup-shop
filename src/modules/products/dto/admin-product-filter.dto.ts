import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { SortOrder } from './product-filter.dto';

export class AdminProductFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  minPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  maxPrice?: number;

  @ApiProperty({ required: false, enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  sortByCreatedAt?: SortOrder;

  @ApiProperty({ required: false, enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  sortByPrice?: SortOrder;

  @ApiProperty({ required: false, minimum: 1, default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  page?: number = 1;

  @ApiProperty({ required: false, minimum: 1, maximum: 100, default: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => Number(value))
  limit?: number = 10;
}
