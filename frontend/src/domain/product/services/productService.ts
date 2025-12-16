/**
 * @service Product Service
 * @domain product
 * @type REST API
 *
 * Handles product data fetching from backend API
 */

import { publicClient } from '@/core/lib/api';
import type { Product } from '../types/models';

export const productService = {
  /**
   * Fetch primary product (main product for landing page)
   * @returns Promise<Product>
   */
  async getPrimary(): Promise<Product> {
    const { data } = await publicClient.get<{ success: boolean; data: Product }>('/product');
    return data.data;
  },

  /**
   * Fetch product by ID
   * @param id - Product ID
   * @returns Promise<Product>
   */
  async getById(id: number): Promise<Product> {
    const { data } = await publicClient.get<{ success: boolean; data: Product }>(`/product/${id}`);
    return data.data;
  },
};
