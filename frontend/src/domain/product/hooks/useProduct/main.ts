/**
 * Custom hook for fetching product data
 * Uses TanStack Query for server state management
 */

import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductOptions } from './types';

export const useProduct = (options?: UseProductOptions) => {
  const { productId, enabled = true } = options || {};

  const queryKey = productId ? ['product', productId] : ['product', 'primary'];

  const queryFn = productId
    ? () => productService.getById(productId)
    : () => productService.getPrimary();

  return useQuery({
    queryKey,
    queryFn,
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};
