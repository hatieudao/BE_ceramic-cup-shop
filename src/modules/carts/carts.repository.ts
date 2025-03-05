import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entity/cart.entity';
import { CartItem } from './entity/cart-item.entity';
import { CART_ITEM_ENTITY } from '../../constant';

interface CartItemTotal {
  total: number;
}

@Injectable()
export class CartsRepository {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async findCartByUserId(userId: string): Promise<Cart | null> {
    return this.cartRepository.findOne({
      where: { userId },
      relations: {
        cartItems: {
          productType: true,
        },
      },
    });
  }

  async createCart(userId: string): Promise<Cart> {
    const cart = this.cartRepository.create({ userId });
    return await this.cartRepository.save(cart);
  }

  async addCartItem(
    cartId: string,
    cartItem: Partial<CartItem>,
  ): Promise<CartItem> {
    const item = this.cartItemRepository.create({ ...cartItem, cartId });
    return await this.cartItemRepository.save(item);
  }

  async removeCartItem(cartItemId: string): Promise<void> {
    await this.cartItemRepository.delete(cartItemId);
  }

  async updateCartTotalItems(cartId: string): Promise<void> {
    const totalItems = await this.cartItemRepository
      .createQueryBuilder(CART_ITEM_ENTITY)
      .where(`${CART_ITEM_ENTITY}.cart_id = :cartId`, { cartId })
      .select(`COUNT(${CART_ITEM_ENTITY}.id)`, 'total')
      .getRawOne<CartItemTotal>();

    await this.cartRepository.update(cartId, {
      totalItem: totalItems?.total || 0,
    });
  }

  async findCartItemById(id: string): Promise<CartItem | null> {
    return this.cartItemRepository.findOne({
      where: { id },
      relations: ['productType'],
    });
  }

  async updateCartItemQuantity(
    cartItemId: string,
    quantity: number,
  ): Promise<void> {
    if (quantity <= 0) {
      await this.removeCartItem(cartItemId);
      return;
    }

    await this.cartItemRepository.update(cartItemId, { quantity });
  }
}
