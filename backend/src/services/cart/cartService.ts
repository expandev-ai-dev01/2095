/**
 * @summary
 * Business logic for Cart entity.
 * Handles cart operations using in-memory storage.
 * All validation and business logic is centralized here.
 *
 * @module services/cart/cartService
 */

import { CART_DEFAULTS } from '@/constants';
import { cartStore } from '@/instances';
import { productStore } from '@/instances';
import { ServiceError } from '@/utils';
import { CartResponse, CartItem } from './cartTypes';
import { addToCartSchema } from './cartValidation';

/**
 * @summary
 * Adds a product to the shopping cart.
 *
 * @function cartAddItem
 * @module services/cart
 *
 * @param {unknown} body - Raw request body to validate against addToCartSchema
 * @returns {Promise<CartResponse>} The updated cart with the new item
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails schema validation
 * @throws {ServiceError} NOT_FOUND (404) - When product does not exist
 * @throws {ServiceError} CART_LIMIT_EXCEEDED (400) - When cart has too many different items
 *
 * @example
 * const cart = await cartAddItem({ productId: 1, quantity: 2 });
 * // Returns: { id: 'uuid', items: [...], totalItems: 2, totalAmount: 'R$ 90,00', message: 'Item added to cart' }
 */
export async function cartAddItem(body: unknown): Promise<CartResponse> {
  const validation = addToCartSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const { productId, quantity } = validation.data;

  // Validate product exists
  const product = productStore.getById(productId);
  if (!product) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  // Get or create cart
  let cart = cartStore.getActiveCart();
  if (!cart) {
    cart = cartStore.createCart();
  }

  // Check if adding new item would exceed limit
  const existingItem = cart.items.find((item) => item.productId === productId);
  if (!existingItem && cart.items.length >= CART_DEFAULTS.MAX_ITEMS) {
    throw new ServiceError(
      'CART_LIMIT_EXCEEDED',
      `Maximum ${CART_DEFAULTS.MAX_ITEMS} different items allowed in cart`,
      400
    );
  }

  // Add or update item
  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (newQuantity > CART_DEFAULTS.MAX_QUANTITY) {
      throw new ServiceError(
        'QUANTITY_LIMIT_EXCEEDED',
        `Maximum quantity per item is ${CART_DEFAULTS.MAX_QUANTITY}`,
        400
      );
    }
    existingItem.quantity = newQuantity;
    existingItem.subtotal = existingItem.quantity * existingItem.price;
  } else {
    const newItem: CartItem = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity,
      subtotal: product.price * quantity,
    };
    cart.items.push(newItem);
  }

  // Update cart totals
  cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  cart.totalAmount = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
  cart.dateModified = new Date().toISOString();

  cartStore.updateCart(cart);

  return {
    id: cart.id,
    items: cart.items,
    totalItems: cart.totalItems,
    totalAmount: formatPrice(cart.totalAmount),
    message: 'Item added to cart',
  };
}

/**
 * Helper function to format price in Brazilian Real format
 * @param {number} price - Price value
 * @returns {string} Formatted price string
 */
function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}
