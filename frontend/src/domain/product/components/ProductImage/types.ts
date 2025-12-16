import type { ProductPrimaryImage } from '../../types/models';

export interface ProductImageProps {
  image: ProductPrimaryImage;
  className?: string;
  priority?: boolean;
  onImageClick?: () => void;
}
