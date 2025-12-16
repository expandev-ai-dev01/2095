/**
 * ProductInfo Component
 * Displays product name, price, and description
 */

import { cn } from '@/core/lib/utils';
import type { ProductInfoProps } from './types';

function ProductInfo({ name, price, description, className }: ProductInfoProps) {
  return (
    <div
      className={cn('flex flex-col gap-3', className)}
      role="region"
      aria-label="Informações do produto"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{name}</h1>
        <p
          className="text-primary text-2xl font-semibold md:text-3xl"
          aria-label={`Preço: ${price}`}
        >
          {price}
        </p>
      </div>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export { ProductInfo };
