/**
 * AddToCartButton Component
 * Button to add product to cart with loading state
 */

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/core/components/button';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { useAddToCart } from '../../hooks/useAddToCart';
import { cn } from '@/core/lib/utils';
import type { AddToCartButtonProps } from './types';

function AddToCartButton({
  productId,
  quantity,
  disabled = false,
  className,
}: AddToCartButtonProps) {
  const { mutate: addToCart, isPending } = useAddToCart();

  const handleClick = () => {
    addToCart({ productId, quantity });
  };

  const isDisabled = disabled || isPending;

  return (
    <Button
      onClick={handleClick}
      disabled={isDisabled}
      size="lg"
      className={cn('w-full gap-2 sm:w-auto', className)}
      aria-label="Adicionar ao carrinho"
    >
      {isPending ? (
        <>
          <LoadingSpinner className="size-5" />
          <span>Adicionando...</span>
        </>
      ) : (
        <>
          <ShoppingCart className="size-5" />
          <span>Adicionar ao Carrinho</span>
        </>
      )}
    </Button>
  );
}

export { AddToCartButton };
