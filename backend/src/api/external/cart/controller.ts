/**
 * @summary
 * API controller for Cart entity (external/public endpoints).
 * Thin layer that delegates all logic to service.
 *
 * @module api/external/cart/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import { cartAddItem } from '@/services/cart';

/**
 * @api {post} /api/external/cart/add Add to Cart
 * @apiName AddToCart
 * @apiGroup Cart
 *
 * @apiBody {Number} productId Product ID (positive integer)
 * @apiBody {Number} quantity Quantity to add (1-99)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.id Cart unique identifier (UUID)
 * @apiSuccess {Object[]} data.items Cart items array
 * @apiSuccess {Number} data.items.productId Product ID
 * @apiSuccess {String} data.items.productName Product name
 * @apiSuccess {Number} data.items.price Unit price
 * @apiSuccess {Number} data.items.quantity Item quantity
 * @apiSuccess {Number} data.items.subtotal Item subtotal (price * quantity)
 * @apiSuccess {Number} data.totalItems Total quantity of all items
 * @apiSuccess {String} data.totalAmount Formatted total amount (R$ XX,XX)
 * @apiSuccess {String} data.message Success message
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | NOT_FOUND | CART_LIMIT_EXCEEDED | QUANTITY_LIMIT_EXCEEDED)
 * @apiError {String} error.message Error message
 */
export async function addToCartHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await cartAddItem(req.body);
    res.status(201).json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
