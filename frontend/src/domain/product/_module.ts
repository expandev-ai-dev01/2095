/**
 * Product Domain Module
 * Exports all product-related functionality
 */

export * from './hooks';
export * from './services';
export type * from './types';

// Component exports
export { ProductImage } from './components/ProductImage';
export { ProductGallery } from './components/ProductGallery';
export { ProductInfo } from './components/ProductInfo';
export { ProductImageZoom } from './components/ProductImageZoom';

// Re-export component types
export type { ProductImageProps } from './components/ProductImage';
export type { ProductGalleryProps } from './components/ProductGallery';
export type { ProductInfoProps } from './components/ProductInfo';
export type { ProductImageZoomProps } from './components/ProductImageZoom';
