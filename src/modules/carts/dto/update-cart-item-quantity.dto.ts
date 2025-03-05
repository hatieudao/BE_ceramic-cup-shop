import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateCartItemQuantityDto {
  @ApiProperty({
    description: 'The new quantity for the cart item',
    example: 2,
  })
  @IsNumber()
  @Min(0)
  quantity: number;
}
