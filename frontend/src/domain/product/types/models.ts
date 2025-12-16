/**
 * Product domain type definitions
 * Matches backend API response structure
 */

export interface ProductImage {
  url: string;
  altText: string;
}

export interface ProductImageDimensions {
  desktop: {
    width: number;
    height: number;
  };
  tablet: {
    width: number;
  };
  mobile: {
    maxWidth: number;
  };
}

export interface ProductPrimaryImage extends ProductImage {
  dimensions: ProductImageDimensions;
}

export interface ProductSecondaryImage extends ProductImage {
  thumbnailSize: {
    desktop: number;
    mobile: number;
  };
}

export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  primaryImage: ProductPrimaryImage;
  secondaryImages: ProductSecondaryImage[];
}
