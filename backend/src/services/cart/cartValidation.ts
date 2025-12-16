/**
 * @summary
 * Validation schemas for Cart entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/cart/cartValidation
 */

import { z } from 'zod';
import { CART_DEFAULTS } from '@/constants';

/**
 * Schema for add to cart request validation
 */
export const addToCartSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().min(CART_DEFAULTS.MIN_QUANTITY).max(CART_DEFAULTS.MAX_QUANTITY),
});

/**
 * Schema for cart ID parameter validation
 */
export const cartIdSchema = z.object({
  id: z.string().uuid(),
});

/**
 * Inferred types from schemas
 */
export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type CartIdInput = z.infer<typeof cartIdSchema>;
