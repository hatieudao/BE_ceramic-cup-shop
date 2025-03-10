import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { Cart } from './entity/cart.entity';
import { CartItem } from './entity/cart-item.entity';
import { GetCurrentUserId } from '../../decorators/get-current-user-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateCartItemQuantityDto } from './dto/update-cart-item-quantity.dto';

@Controller('carts')
@ApiTags('Carts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  @ApiOperation({ summary: 'Get user cart' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user cart with items',
    type: Cart,
  })
  async getCart(@GetCurrentUserId() userId: string): Promise<{ data: Cart }> {
    return this.cartsService.getOrCreateCart(userId);
  }

  @Post('items')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({
    status: 201,
    description: 'Item added to cart successfully',
    type: CartItem,
  })
  async addCartItem(
    @GetCurrentUserId() userId: string,
    @Body() createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    return this.cartsService.addCartItem(userId, createCartItemDto);
  }

  @Delete('items/:id')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiResponse({
    status: 200,
    description: 'Item removed from cart successfully',
  })
  async removeCartItem(
    @GetCurrentUserId() userId: string,
    @Param('id') cartItemId: string,
  ): Promise<void> {
    await this.cartsService.removeCartItem(userId, cartItemId);
  }

  @Patch('items/:id/quantity')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiResponse({
    status: 200,
    description: 'Cart item quantity updated successfully',
  })
  async updateCartItemQuantity(
    @GetCurrentUserId() userId: string,
    @Param('id') cartItemId: string,
    @Body() updateCartItemQuantityDto: UpdateCartItemQuantityDto,
  ): Promise<void> {
    await this.cartsService.updateCartItemQuantity(
      userId,
      cartItemId,
      updateCartItemQuantityDto.quantity,
    );
  }
}
