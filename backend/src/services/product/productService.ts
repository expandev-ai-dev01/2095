/**
 * @summary
 * Business logic for Product entity.
 * Handles product display operations using in-memory storage.
 * All validation and business logic is centralized here.
 *
 * @module services/product/productService
 */

import { PRODUCT_IMAGE_LIMITS } from '@/constants';
import { productStore } from '@/instances';
import { ServiceError } from '@/utils';
import { ProductDisplayResponse } from './productTypes';
import { paramsSchema } from './productValidation';

/**
 * @summary
 * Retrieves the primary product for display on the landing page.
 *
 * @function productGetPrimary
 * @module services/product
 *
 * @returns {Promise<ProductDisplayResponse>} The primary product with display-optimized structure
 *
 * @throws {ServiceError} NOT_FOUND (404) - When primary product does not exist
 *
 * @example
 * const product = await productGetPrimary();
 * // Returns: {
 * //   id: 1,
 * //   name: 'Bolo de Chocolate Artesanal',
 * //   price: 'R$ 45,00',
 * //   description: '...',
 * //   primaryImage: { url: '...', altText: '...', dimensions: {...} },
 * //   secondaryImages: [...]
 * // }
 */
export async function productGetPrimary(): Promise<ProductDisplayResponse> {
  const product = productStore.getPrimary();

  if (!product) {
    throw new ServiceError('NOT_FOUND', 'Primary product not found', 404);
  }

  return {
    id: product.id,
    name: product.name,
    price: formatPrice(product.price),
    description: product.description,
    primaryImage: {
      url: product.primaryImage.url,
      altText: product.primaryImage.altText,
      dimensions: {
        desktop: {
          width: PRODUCT_IMAGE_LIMITS.DESKTOP_WIDTH,
          height: PRODUCT_IMAGE_LIMITS.DESKTOP_HEIGHT,
        },
        tablet: {
          width: PRODUCT_IMAGE_LIMITS.TABLET_WIDTH,
        },
        mobile: {
          maxWidth: PRODUCT_IMAGE_LIMITS.MOBILE_MAX_WIDTH,
        },
      },
    },
    secondaryImages: product.secondaryImages.map((img) => ({
      url: img.url,
      altText: img.altText,
      thumbnailSize: {
        desktop: PRODUCT_IMAGE_LIMITS.THUMBNAIL_SIZE,
        mobile: PRODUCT_IMAGE_LIMITS.THUMBNAIL_SIZE_MOBILE,
      },
    })),
  };
}

/**
 * @summary
 * Retrieves a specific product by ID.
 *
 * @function productGet
 * @module services/product
 *
 * @param {unknown} params - Raw request params containing the ID to validate
 * @returns {Promise<ProductDisplayResponse>} The found product with display-optimized structure
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When product with given ID does not exist
 *
 * @example
 * const product = await productGet({ id: '1' });
 * // Returns: { id: 1, name: 'Bolo de Chocolate Artesanal', ... }
 */
export async function productGet(params: unknown): Promise<ProductDisplayResponse> {
  const validation = paramsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const product = productStore.getById(id);

  if (!product) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  return {
    id: product.id,
    name: product.name,
    price: formatPrice(product.price),
    description: product.description,
    primaryImage: {
      url: product.primaryImage.url,
      altText: product.primaryImage.altText,
      dimensions: {
        desktop: {
          width: PRODUCT_IMAGE_LIMITS.DESKTOP_WIDTH,
          height: PRODUCT_IMAGE_LIMITS.DESKTOP_HEIGHT,
        },
        tablet: {
          width: PRODUCT_IMAGE_LIMITS.TABLET_WIDTH,
        },
        mobile: {
          maxWidth: PRODUCT_IMAGE_LIMITS.MOBILE_MAX_WIDTH,
        },
      },
    },
    secondaryImages: product.secondaryImages.map((img) => ({
      url: img.url,
      altText: img.altText,
      thumbnailSize: {
        desktop: PRODUCT_IMAGE_LIMITS.THUMBNAIL_SIZE,
        mobile: PRODUCT_IMAGE_LIMITS.THUMBNAIL_SIZE_MOBILE,
      },
    })),
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
