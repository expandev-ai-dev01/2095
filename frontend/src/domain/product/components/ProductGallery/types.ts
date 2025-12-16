import type { ProductSecondaryImage } from '../../types/models';

export interface ProductGalleryProps {
  images: ProductSecondaryImage[];
  currentIndex: number;
  onImageSelect: (index: number) => void;
  className?: string;
}
