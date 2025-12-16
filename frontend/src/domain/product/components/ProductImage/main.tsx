/**
 * ProductImage Component
 * Displays product image with responsive dimensions and zoom capability
 */

import { useState } from 'react';
import { cn } from '@/core/lib/utils';
import { ZoomIn } from 'lucide-react';
import type { ProductImageProps } from './types';

function ProductImage({ image, className, priority = false, onImageClick }: ProductImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  if (hasError) {
    return (
      <div
        className={cn(
          'bg-muted flex items-center justify-center rounded-lg border',
          'h-[400px] w-full md:h-[400px] md:w-[600px]',
          className
        )}
      >
        <p className="text-muted-foreground text-sm">Imagem não disponível</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border shadow-md transition-all duration-200',
        'hover:shadow-lg',
        className
      )}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div
          className={cn(
            'bg-muted absolute inset-0 animate-pulse',
            'h-[400px] w-full md:h-[400px] md:w-[600px]'
          )}
        />
      )}

      {/* Main image */}
      <img
        src={image.url}
        alt={image.altText}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={cn(
          'h-auto w-full object-cover transition-opacity duration-300',
          'max-w-[400px] md:h-[400px] md:w-[600px] md:max-w-none',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          aspectRatio: '3/2',
        }}
      />

      {/* Zoom indicator */}
      {onImageClick && isLoaded && (
        <button
          onClick={onImageClick}
          className={cn(
            'absolute right-4 top-4 flex items-center gap-2 rounded-md bg-black/50 px-3 py-2',
            'text-sm font-medium text-white opacity-0 transition-opacity duration-200',
            'hover:bg-black/70 group-hover:opacity-100',
            'focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
          )}
          aria-label="Ampliar imagem"
        >
          <ZoomIn className="size-4" />
          <span className="hidden sm:inline">Ampliar</span>
        </button>
      )}
    </div>
  );
}

export { ProductImage };
