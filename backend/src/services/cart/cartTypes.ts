/**
 * @summary
 * Type definitions for Cart entity.
 *
 * @module services/cart/cartTypes
 */

/**
 * @interface CartItem
 * @description Represents a single item in the shopping cart
 */
export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

/**
 * @interface CartEntity
 * @description Represents the shopping cart entity
 */
export interface CartEntity {
  id: string;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  dateCreated: string;
  dateModified: string;
}

/**
 * @interface AddToCartRequest
 * @description Request payload for adding item to cart
 */
export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

/**
 * @interface CartResponse
 * @description Response structure for cart operations
 */
export interface CartResponse {
  id: string;
  items: CartItem[];
  totalItems: number;
  totalAmount: string;
  message?: string;
}
