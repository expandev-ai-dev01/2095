/**
 * ProductImageZoom Component
 * Modal for viewing product images at full size with zoom capability
 */

import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import { Dialog, DialogContent } from '@/core/components/dialog';
import type { ProductImageZoomProps } from './types';

function ProductImageZoom({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ProductImageZoomProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onNavigate]);

  const currentImage = images[currentIndex];

  if (!currentImage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] p-0 md:max-w-[90vw]" showCloseButton={false}>
        <div className="relative flex flex-col items-center justify-center bg-black/95 p-4">
          {/* Close button */}
          <button
            onClick={onClose}
            className={cn(
              'absolute right-4 top-4 z-10 rounded-md bg-white/10 p-2',
              'text-white transition-colors hover:bg-white/20',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
            )}
            aria-label="Fechar"
          >
            <X className="size-6" />
          </button>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                disabled={currentIndex === 0}
                className={cn(
                  'absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-md bg-white/10 p-2',
                  'text-white transition-colors hover:bg-white/20',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                  'disabled:cursor-not-allowed disabled:opacity-30'
                )}
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="size-6" />
              </button>

              <button
                onClick={() => onNavigate(currentIndex + 1)}
                disabled={currentIndex === images.length - 1}
                className={cn(
                  'absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-md bg-white/10 p-2',
                  'text-white transition-colors hover:bg-white/20',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                  'disabled:cursor-not-allowed disabled:opacity-30'
                )}
                aria-label="Próxima imagem"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          {/* Image */}
          <div className="relative flex max-h-[80vh] items-center justify-center">
            <img
              src={currentImage.url}
              alt={currentImage.altText}
              className="max-h-[80vh] w-auto max-w-full object-contain"
              style={{ maxWidth: '1200px' }}
            />
          </div>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="mt-4 rounded-md bg-white/10 px-3 py-1 text-sm text-white">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { ProductImageZoom };
