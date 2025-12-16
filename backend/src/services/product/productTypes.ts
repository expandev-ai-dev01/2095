/**
 * @summary
 * Type definitions for Product entity.
 *
 * @module services/product/productTypes
 */

/**
 * @interface ProductImage
 * @description Represents a product image with metadata
 */
export interface ProductImage {
  url: string;
  altText: string;
  width: number;
  height: number;
  format: string;
  isPrimary: boolean;
}

/**
 * @interface ProductEntity
 * @description Represents the main product entity
 */
export interface ProductEntity {
  id: number;
  name: string;
  price: number;
  description: string;
  primaryImage: ProductImage;
  secondaryImages: ProductImage[];
  dateCreated: string;
  dateModified: string;
}

/**
 * @interface ProductDisplayResponse
 * @description Response structure for product display
 */
export interface ProductDisplayResponse {
  id: number;
  name: string;
  price: string;
  description: string;
  primaryImage: {
    url: string;
    altText: string;
    dimensions: {
      desktop: { width: number; height: number };
      tablet: { width: number };
      mobile: { maxWidth: number };
    };
  };
  secondaryImages: Array<{
    url: string;
    altText: string;
    thumbnailSize: {
      desktop: number;
      mobile: number;
    };
  }>;
}

/**
 * @interface ProductImageValidation
 * @description Image validation result
 */
export interface ProductImageValidation {
  isValid: boolean;
  errors: string[];
}
