/**
 * Custom hook for adding items to cart
 * Uses TanStack Query for mutation management
 */

import { useMutation } from '@tanstack/react-query';
import { cartService } from '../../services/cartService';
import type { UseAddToCartOptions } from './types';
import { toast } from 'sonner';

export const useAddToCart = (options?: UseAddToCartOptions) => {
  const { onSuccess, onError } = options || {};

  return useMutation({
    mutationFn: cartService.addItem,
    onSuccess: (data) => {
      toast.success('Produto adicionado ao carrinho!', {
        description: data.message,
      });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error('Erro ao adicionar ao carrinho', {
        description: error.message || 'Tente novamente mais tarde.',
      });
      onError?.(error);
    },
  });
};
