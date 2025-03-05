import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsUUID()
  @ApiProperty({ description: 'Product Type ID', format: 'uuid' })
  productTypeId: string;

  @IsNumber()
  @Min(1)
  @ApiProperty({ description: 'Quantity', minimum: 1 })
  quantity: number;
}
