/**
 * ProductGallery Component
 * Displays thumbnail gallery of secondary product images
 */

import { cn } from '@/core/lib/utils';
import type { ProductGalleryProps } from './types';

function ProductGallery({ images, currentIndex, onImageSelect, className }: ProductGalleryProps) {
  if (!images?.length) {
    return null;
  }

  return (
    <div
      className={cn('flex gap-2 overflow-x-auto pb-2', className)}
      role="list"
      aria-label="Galeria de imagens do produto"
    >
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => onImageSelect(index)}
          className={cn(
            'shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200',
            'hover:border-primary hover:shadow-md',
            'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2',
            currentIndex === index
              ? 'border-primary shadow-md'
              : 'border-transparent opacity-70 hover:opacity-100',
            'size-[80px] md:size-[100px]'
          )}
          aria-label={`Ver imagem ${index + 1}`}
          aria-current={currentIndex === index}
        >
          <img
            src={image.url}
            alt={image.altText}
            className="size-full object-cover"
            loading="lazy"
          />
        </button>
      ))}
    </div>
  );
}

export { ProductGallery };
