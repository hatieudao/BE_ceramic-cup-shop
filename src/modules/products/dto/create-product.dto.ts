import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';

export class CreateProductTypeDto {
  @ApiProperty({ example: 'Product Type Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Product Type Description' })
  @IsString()
  description: string;

  @ApiProperty({ example: '99.99' })
  @IsString()
  price: string;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  stock: number;

  @ApiProperty({ example: 'upload/image-url.jpg' })
  @IsString()
  imageUrl: string;
}

export class CreateProductDto {
  @ApiProperty({ example: 'Product Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Product Description' })
  @IsString()
  description: string;

  @ApiProperty({ type: [CreateProductTypeDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateProductTypeDto)
  @ArrayMinSize(1)
  productTypes: CreateProductTypeDto[];
}
