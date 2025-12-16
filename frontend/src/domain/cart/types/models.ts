/**
 * Cart domain type definitions
 * Matches backend API response structure
 */

export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalItems: number;
  totalAmount: string;
  message: string;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}
