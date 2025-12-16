/**
 * @summary
 * Default values and constants for Product entity.
 * Provides centralized configuration for product display, image specifications,
 * and validation limits.
 *
 * @module constants/product/productDefaults
 */

/**
 * @interface ProductDefaultsType
 * @description Default configuration values for product display
 *
 * @property {string} NAME - Default product name
 * @property {number} PRICE - Default product price
 * @property {string} DESCRIPTION - Default product description
 * @property {string} IMAGE_URL - Default product image URL
 * @property {string} ALT_TEXT - Default image alt text
 */
export const PRODUCT_DEFAULTS = {
  NAME: 'Bolo de Chocolate Artesanal',
  PRICE: 45.0,
  DESCRIPTION:
    'Delicioso bolo de chocolate artesanal feito com ingredientes selecionados e cobertura especial. Perfeito para qualquer ocasião.',
  IMAGE_URL: '/images/bolo-chocolate.jpg',
  ALT_TEXT: 'Bolo de Chocolate Artesanal com cobertura especial',
} as const;

/** Type representing the PRODUCT_DEFAULTS constant */
export type ProductDefaultsType = typeof PRODUCT_DEFAULTS;

/**
 * @interface ProductImageLimitsType
 * @description Image specifications and validation constraints
 *
 * @property {number} MAX_FILE_SIZE - Maximum file size in bytes (2MB)
 * @property {number} MIN_WIDTH - Minimum image width in pixels
 * @property {number} MIN_HEIGHT - Minimum image height in pixels
 * @property {number} DESKTOP_WIDTH - Desktop display width
 * @property {number} DESKTOP_HEIGHT - Desktop display height
 * @property {number} MOBILE_MAX_WIDTH - Mobile maximum width
 * @property {number} TABLET_WIDTH - Tablet display width
 * @property {number} THUMBNAIL_SIZE - Thumbnail size for gallery
 * @property {number} THUMBNAIL_SIZE_MOBILE - Mobile thumbnail size
 * @property {number} MAX_SECONDARY_IMAGES - Maximum number of secondary images
 * @property {number} ZOOM_FACTOR - Maximum zoom factor (200%)
 */
export const PRODUCT_IMAGE_LIMITS = {
  MAX_FILE_SIZE: 2097152, // 2MB in bytes
  MIN_WIDTH: 1200,
  MIN_HEIGHT: 800,
  DESKTOP_WIDTH: 600,
  DESKTOP_HEIGHT: 400,
  MOBILE_MAX_WIDTH: 400,
  TABLET_WIDTH: 450,
  THUMBNAIL_SIZE: 100,
  THUMBNAIL_SIZE_MOBILE: 80,
  MAX_SECONDARY_IMAGES: 4,
  ZOOM_FACTOR: 2.0,
} as const;

/** Type representing the PRODUCT_IMAGE_LIMITS constant */
export type ProductImageLimitsType = typeof PRODUCT_IMAGE_LIMITS;

/**
 * @interface ProductValidationLimitsType
 * @description Validation constraints for product fields
 *
 * @property {number} NAME_MAX_LENGTH - Maximum characters for product name
 * @property {number} ALT_TEXT_MAX_LENGTH - Maximum characters for alt text
 * @property {number} DESCRIPTION_MIN_LENGTH - Minimum characters for description
 * @property {number} DESCRIPTION_MAX_LENGTH - Maximum characters for description
 */
export const PRODUCT_VALIDATION_LIMITS = {
  NAME_MAX_LENGTH: 50,
  ALT_TEXT_MAX_LENGTH: 125,
  DESCRIPTION_MIN_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 250,
} as const;

/** Type representing the PRODUCT_VALIDATION_LIMITS constant */
export type ProductValidationLimitsType = typeof PRODUCT_VALIDATION_LIMITS;

/**
 * @interface ProductImageFormatsType
 * @description Allowed image formats
 */
export const PRODUCT_IMAGE_FORMATS = {
  ALLOWED: ['jpg', 'jpeg', 'png', 'webp'] as const,
  MIME_TYPES: ['image/jpeg', 'image/png', 'image/webp'] as const,
} as const;

/** Type representing the PRODUCT_IMAGE_FORMATS constant */
export type ProductImageFormatsType = typeof PRODUCT_IMAGE_FORMATS;
