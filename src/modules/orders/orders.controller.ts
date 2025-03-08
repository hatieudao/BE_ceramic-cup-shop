import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetCurrentUserId } from '../../decorators/get-current-user-id.decorator';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../authentication/users/entity/user.entity';
import { Order, OrderStatus } from './entity/order.entity';
import { OrdersService } from './orders.service';
import { OrderFilterDto, SortOrder } from './dto/order-filter.dto';

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
  async submitOrder(
    @GetCurrentUserId() userId: string,
    @Body() addressData: CreateAddressDto,
  ): Promise<Order> {
    return this.ordersService.submitOrder(userId, addressData);
  }

  @Get()
  @ApiOperation({ summary: 'Get user orders with filtering and pagination' })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'sortByCreatedAt', required: false, enum: SortOrder })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns user orders',
    type: Order,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getUserOrders(
    @GetCurrentUserId() userId: string,
    @Query() filterDto: OrderFilterDto,
  ) {
    return this.ordersService.getUserOrders(userId, filterDto);
  }

  @Get('admin')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all orders (Admin only)' })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'sortByCreatedAt', required: false, enum: SortOrder })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns all orders',
    type: Order,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden - Admin access required' })
  async getAllOrders(@Query() filterDto: OrderFilterDto) {
    return this.ordersService.getAllOrders(filterDto);
  }
}
