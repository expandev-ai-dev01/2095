/**
 * @summary
 * In-memory store instance for Product entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/product/productStore
 */

import { PRODUCT_DEFAULTS, PRODUCT_IMAGE_LIMITS, PRODUCT_IMAGE_FORMATS } from '@/constants/product';
import { ProductEntity, ProductImage } from '@/services/product/productTypes';

/**
 * In-memory store for Product records
 */
class ProductStore {
  private products: Map<number, ProductEntity> = new Map();
  private currentId: number = 0;

  constructor() {
    this.initializeDefaultProduct();
  }

  /**
   * Initialize store with default product
   */
  private initializeDefaultProduct(): void {
    const defaultPrimaryImage: ProductImage = {
      url: PRODUCT_DEFAULTS.IMAGE_URL,
      altText: PRODUCT_DEFAULTS.ALT_TEXT,
      width: PRODUCT_IMAGE_LIMITS.MIN_WIDTH,
      height: PRODUCT_IMAGE_LIMITS.MIN_HEIGHT,
      format: 'jpg',
      isPrimary: true,
    };

    const defaultProduct: ProductEntity = {
      id: 1,
      name: PRODUCT_DEFAULTS.NAME,
      price: PRODUCT_DEFAULTS.PRICE,
      description: PRODUCT_DEFAULTS.DESCRIPTION,
      primaryImage: defaultPrimaryImage,
      secondaryImages: [],
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    };

    this.currentId = 1;
    this.products.set(1, defaultProduct);
  }

  /**
   * Get next available ID
   */
  getNextId(): number {
    this.currentId += 1;
    return this.currentId;
  }

  /**
   * Get all products
   */
  getAll(): ProductEntity[] {
    return Array.from(this.products.values());
  }

  /**
   * Get product by ID
   */
  getById(id: number): ProductEntity | undefined {
    return this.products.get(id);
  }

  /**
   * Get primary product (ID 1)
   */
  getPrimary(): ProductEntity | undefined {
    return this.products.get(1);
  }

  /**
   * Add new product
   */
  add(product: ProductEntity): ProductEntity {
    this.products.set(product.id, product);
    return product;
  }

  /**
   * Update existing product
   */
  update(id: number, data: Partial<ProductEntity>): ProductEntity | undefined {
    const existing = this.products.get(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data, dateModified: new Date().toISOString() };
    this.products.set(id, updated);
    return updated;
  }

  /**
   * Delete product by ID
   */
  delete(id: number): boolean {
    return this.products.delete(id);
  }

  /**
   * Check if product exists
   */
  exists(id: number): boolean {
    return this.products.has(id);
  }

  /**
   * Get total count of products
   */
  count(): number {
    return this.products.size;
  }

  /**
   * Clear all products (useful for testing)
   */
  clear(): void {
    this.products.clear();
    this.currentId = 0;
    this.initializeDefaultProduct();
  }
}

/**
 * Singleton instance of ProductStore
 */
export const productStore = new ProductStore();
