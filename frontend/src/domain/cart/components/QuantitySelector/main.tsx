/**
 * QuantitySelector Component
 * Allows users to select quantity with increment/decrement buttons
 */

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/core/components/button';
import { cn } from '@/core/lib/utils';
import type { QuantitySelectorProps } from './types';

function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  className,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const isDecrementDisabled = disabled || value <= min;
  const isIncrementDisabled = disabled || value >= max;

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md border p-1',
        'bg-background shadow-sm',
        className
      )}
      role="group"
      aria-label="Seletor de quantidade"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={handleDecrement}
        disabled={isDecrementDisabled}
        aria-label="Diminuir quantidade"
        className="size-8"
      >
        <Minus className="size-4" />
      </Button>

      <div
        className="flex min-w-[3rem] items-center justify-center px-2 text-center text-base font-medium"
        role="status"
        aria-live="polite"
        aria-label={`Quantidade: ${value}`}
      >
        {value}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={handleIncrement}
        disabled={isIncrementDisabled}
        aria-label="Aumentar quantidade"
        className="size-8"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}

export { QuantitySelector };
