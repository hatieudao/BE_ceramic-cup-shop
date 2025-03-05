import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { GetCurrentUserId } from '../../decorators/get-current-user-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../authentication/users/entity/user.entity';

@Controller('orders')
@ApiTags('Orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('submit')
  @ApiOperation({ summary: 'Submit an order from cart' })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Cart is empty or insufficient stock',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async submitOrder(@GetCurrentUserId() userId: string): Promise<Order> {
    return this.ordersService.submitOrder(userId);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all orders (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Returns all orders',
    type: [Order],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden - Admin access required' })
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }
}
