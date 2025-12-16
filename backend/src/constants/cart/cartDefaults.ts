/**
 * @summary
 * Default values and constants for Cart entity.
 * Provides centralized configuration for cart operations and validation limits.
 *
 * @module constants/cart/cartDefaults
 */

/**
 * @interface CartDefaultsType
 * @description Default configuration values for cart operations
 *
 * @property {number} MIN_QUANTITY - Minimum quantity per item (1)
 * @property {number} MAX_QUANTITY - Maximum quantity per item (99)
 * @property {number} MAX_ITEMS - Maximum different items in cart (10)
 */
export const CART_DEFAULTS = {
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 99,
  MAX_ITEMS: 10,
} as const;

/** Type representing the CART_DEFAULTS constant */
export type CartDefaultsType = typeof CART_DEFAULTS;
