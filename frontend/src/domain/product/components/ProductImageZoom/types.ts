import type { ProductPrimaryImage, ProductSecondaryImage } from '../../types/models';

export interface ProductImageZoomProps {
  images: Array<ProductPrimaryImage | ProductSecondaryImage>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}
