/**
 * @summary
 * External API routes configuration.
 * Handles public endpoints that don't require authentication.
 *
 * @module routes/externalRoutes
 */

import { Router } from 'express';
import * as productController from '@/api/external/product/controller';
import * as cartController from '@/api/external/cart/controller';
import * as contactController from '@/api/external/contact/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Product routes - /api/external/product
 */
router.get('/product', productController.getPrimaryHandler);
router.get('/product/:id', productController.getHandler);

/**
 * @rule {be-route-configuration}
 * Cart routes - /api/external/cart
 */
router.post('/cart/add', cartController.addToCartHandler);

/**
 * @rule {be-route-configuration}
 * Contact routes - /api/external/contact
 */
router.post('/contact', contactController.submitHandler);

export default router;
