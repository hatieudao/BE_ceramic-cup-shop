import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Ceramic Cup Name' })
  name: string;

  @ApiProperty({ example: 799.99 })
  price: number;

  @ApiProperty({ example: 1, description: 'Product type ID' })
  productTypeId: number;
}
