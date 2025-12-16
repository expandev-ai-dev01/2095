/**
 * @service Cart Service
 * @domain cart
 * @type REST API
 *
 * Handles cart operations with backend API
 */

import { publicClient } from '@/core/lib/api';
import type { Cart, AddToCartRequest } from '../types/models';

export const cartService = {
  /**
   * Add item to cart
   * @param request - Product ID and quantity
   * @returns Promise<Cart>
   */
  async addItem(request: AddToCartRequest): Promise<Cart> {
    const { data } = await publicClient.post<{ success: boolean; data: Cart }>(
      '/cart/add',
      request
    );
    return data.data;
  },
};
