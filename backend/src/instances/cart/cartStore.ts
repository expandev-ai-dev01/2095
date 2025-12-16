/**
 * @summary
 * In-memory store instance for Cart entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/cart/cartStore
 */

import { CartEntity } from '@/services/cart/cartTypes';
import { v4 as uuidv4 } from 'uuid';

/**
 * In-memory store for Cart records
 */
class CartStore {
  private carts: Map<string, CartEntity> = new Map();
  private activeCartId: string | null = null;

  /**
   * Create a new cart
   */
  createCart(): CartEntity {
    const now = new Date().toISOString();
    const newCart: CartEntity = {
      id: uuidv4(),
      items: [],
      totalItems: 0,
      totalAmount: 0,
      dateCreated: now,
      dateModified: now,
    };

    this.carts.set(newCart.id, newCart);
    this.activeCartId = newCart.id;
    return newCart;
  }

  /**
   * Get active cart (simulates session-based cart)
   */
  getActiveCart(): CartEntity | undefined {
    if (!this.activeCartId) {
      return undefined;
    }
    return this.carts.get(this.activeCartId);
  }

  /**
   * Get cart by ID
   */
  getById(id: string): CartEntity | undefined {
    return this.carts.get(id);
  }

  /**
   * Update existing cart
   */
  updateCart(cart: CartEntity): CartEntity {
    this.carts.set(cart.id, cart);
    return cart;
  }

  /**
   * Delete cart by ID
   */
  delete(id: string): boolean {
    if (this.activeCartId === id) {
      this.activeCartId = null;
    }
    return this.carts.delete(id);
  }

  /**
   * Clear all carts (useful for testing)
   */
  clear(): void {
    this.carts.clear();
    this.activeCartId = null;
  }
}

/**
 * Singleton instance of CartStore
 */
export const cartStore = new CartStore();
