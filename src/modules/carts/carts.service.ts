import { Injectable, NotFoundException } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { Cart } from './entity/cart.entity';
import { CartItem } from './entity/cart-item.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { ProductTypesRepository } from '../products/product-types.repository';

@Injectable()
export class CartsService {
  constructor(
    private readonly cartsRepository: CartsRepository,
    private readonly productTypesRepository: ProductTypesRepository,
  ) {}

  async getOrCreateCart(userId: string): Promise<{ data: Cart }> {
    let cart = await this.cartsRepository.findCartByUserId(userId);
    if (!cart) {
      cart = await this.cartsRepository.createCart(userId);
    }
    return { data: cart };
  }

  async addCartItem(
    userId: string,
    createCartItemDto: CreateCartItemDto,
  ): Promise<CartItem> {
    const cart = await this.getOrCreateCart(userId);

    // Verify product type exists and get its price
    const productType = await this.productTypesRepository.findById(
      createCartItemDto.productTypeId,
    );

    const cartItem = await this.cartsRepository.addCartItem(cart.data.id, {
      productType,
      productTypeId: createCartItemDto.productTypeId,
      quantity: createCartItemDto.quantity,
      price: productType.price,
    });

    await this.cartsRepository.updateCartTotalItems(cart.data.id);
    return cartItem;
  }

  async removeCartItem(userId: string, cartItemId: string): Promise<void> {
    const cart = await this.cartsRepository.findCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItem = await this.cartsRepository.findCartItemById(cartItemId);
    if (!cartItem || cartItem.cartId !== cart.id) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartsRepository.removeCartItem(cartItemId);
    await this.cartsRepository.updateCartTotalItems(cart.id);
  }

  async updateCartItemQuantity(
    userId: string,
    cartItemId: string,
    quantity: number,
  ): Promise<void> {
    const cart = await this.cartsRepository.findCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItem = await this.cartsRepository.findCartItemById(cartItemId);
    if (!cartItem || cartItem.cartId !== cart.id) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartsRepository.updateCartItemQuantity(cartItemId, quantity);
    await this.cartsRepository.updateCartTotalItems(cart.id);
  }
}
