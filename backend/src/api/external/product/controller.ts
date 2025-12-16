/**
 * @summary
 * API controller for Product entity (external/public endpoints).
 * Thin layer that delegates all logic to service.
 *
 * @module api/external/product/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import { productGetPrimary, productGet } from '@/services/product';

/**
 * @api {get} /api/external/product Get Primary Product
 * @apiName GetPrimaryProduct
 * @apiGroup Product
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.name Product name
 * @apiSuccess {String} data.price Formatted price (R$ XX,XX)
 * @apiSuccess {String} data.description Product description
 * @apiSuccess {String} data.primaryImage.url Image URL
 * @apiSuccess {String} data.primaryImage.altText Image alt text
 * @apiSuccess {Number} data.primaryImage.dimensions.desktop.width Desktop width (600px)
 * @apiSuccess {Number} data.primaryImage.dimensions.desktop.height Desktop height (400px)
 * @apiSuccess {Number} data.primaryImage.dimensions.tablet.width Tablet width (450px)
 * @apiSuccess {Number} data.primaryImage.dimensions.mobile.maxWidth Mobile max width (400px)
 * @apiSuccess {Object[]} data.secondaryImages Secondary images array
 * @apiSuccess {String} data.secondaryImages.url Image URL
 * @apiSuccess {String} data.secondaryImages.altText Image alt text
 * @apiSuccess {Number} data.secondaryImages.thumbnailSize.desktop Desktop thumbnail size (100px)
 * @apiSuccess {Number} data.secondaryImages.thumbnailSize.mobile Mobile thumbnail size (80px)
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND)
 * @apiError {String} error.message Error message
 */
export async function getPrimaryHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await productGetPrimary();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/external/product/:id Get Product by ID
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id Product ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.name Product name
 * @apiSuccess {String} data.price Formatted price (R$ XX,XX)
 * @apiSuccess {String} data.description Product description
 * @apiSuccess {String} data.primaryImage.url Image URL
 * @apiSuccess {String} data.primaryImage.altText Image alt text
 * @apiSuccess {Number} data.primaryImage.dimensions.desktop.width Desktop width (600px)
 * @apiSuccess {Number} data.primaryImage.dimensions.desktop.height Desktop height (400px)
 * @apiSuccess {Number} data.primaryImage.dimensions.tablet.width Tablet width (450px)
 * @apiSuccess {Number} data.primaryImage.dimensions.mobile.maxWidth Mobile max width (400px)
 * @apiSuccess {Object[]} data.secondaryImages Secondary images array
 * @apiSuccess {String} data.secondaryImages.url Image URL
 * @apiSuccess {String} data.secondaryImages.altText Image alt text
 * @apiSuccess {Number} data.secondaryImages.thumbnailSize.desktop Desktop thumbnail size (100px)
 * @apiSuccess {Number} data.secondaryImages.thumbnailSize.mobile Mobile thumbnail size (80px)
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await productGet(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
