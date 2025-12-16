/**
 * @summary
 * Validation schemas for Product entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/product/productValidation
 */

import { z } from 'zod';
import {
  PRODUCT_VALIDATION_LIMITS,
  PRODUCT_IMAGE_LIMITS,
  PRODUCT_IMAGE_FORMATS,
} from '@/constants';

/**
 * Schema for product image validation
 */
export const productImageSchema = z.object({
  url: z.string().url(),
  altText: z.string().max(PRODUCT_VALIDATION_LIMITS.ALT_TEXT_MAX_LENGTH),
  width: z.number().int().min(PRODUCT_IMAGE_LIMITS.MIN_WIDTH),
  height: z.number().int().min(PRODUCT_IMAGE_LIMITS.MIN_HEIGHT),
  format: z.enum(PRODUCT_IMAGE_FORMATS.ALLOWED),
  isPrimary: z.boolean(),
});

/**
 * Schema for product entity validation
 */
export const productSchema = z.object({
  name: z.string().min(1).max(PRODUCT_VALIDATION_LIMITS.NAME_MAX_LENGTH),
  price: z.number().positive(),
  description: z
    .string()
    .min(PRODUCT_VALIDATION_LIMITS.DESCRIPTION_MIN_LENGTH)
    .max(PRODUCT_VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH),
  primaryImage: productImageSchema,
  secondaryImages: z.array(productImageSchema).max(PRODUCT_IMAGE_LIMITS.MAX_SECONDARY_IMAGES),
});

/**
 * Schema for ID parameter validation
 */
export const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * Inferred types from schemas
 */
export type ProductImageInput = z.infer<typeof productImageSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type ParamsInput = z.infer<typeof paramsSchema>;
