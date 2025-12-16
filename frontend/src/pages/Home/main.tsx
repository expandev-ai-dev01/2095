/**
 * Home Page - Landing Page
 * Displays main product with image gallery, information, add to cart functionality, and contact form
 */

import { useState } from 'react';
import { useProduct } from '@/domain/product/hooks/useProduct';
import {
  ProductImage,
  ProductGallery,
  ProductInfo,
  ProductImageZoom,
} from '@/domain/product/_module';
import { AddToCartButton, QuantitySelector } from '@/domain/cart/components';
import { ContactForm, ContactInfo } from '@/domain/contact/components';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { Separator } from '@/core/components/separator';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import type { ProductPrimaryImage } from '@/domain/product/types/models';

function HomePage() {
  const { data: product, isLoading, error } = useProduct();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner className="size-8" />
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="size-4" />
          <AlertTitle>Erro ao carregar produto</AlertTitle>
          <AlertDescription>
            Não foi possível carregar as informações do produto. Por favor, tente novamente mais
            tarde.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Combine primary and secondary images for zoom modal
  const allImages = [product.primaryImage, ...product.secondaryImages];

  // Get current image to display (primary or selected secondary)
  const currentImage: ProductPrimaryImage =
    selectedImageIndex === 0
      ? product.primaryImage
      : {
          ...product.secondaryImages[selectedImageIndex - 1],
          dimensions: product.primaryImage.dimensions,
        };

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index + 1); // +1 because index 0 is primary image
  };

  const handleZoomOpen = () => {
    setIsZoomOpen(true);
  };

  const handleZoomClose = () => {
    setIsZoomOpen(false);
  };

  const handleZoomNavigate = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return (
    <div className="flex flex-col gap-12 py-8 md:py-12">
      {/* Product Display Section */}
      <section
        className={cn(
          'grid gap-8 md:grid-cols-2 md:gap-12',
          'bg-card rounded-xl border p-6 shadow-sm md:p-8'
        )}
        aria-label="Produto principal"
      >
        {/* Image Section */}
        <div className="flex flex-col gap-4">
          <ProductImage
            image={currentImage}
            priority
            onImageClick={handleZoomOpen}
            className="w-full"
          />

          {product.secondaryImages?.length > 0 && (
            <ProductGallery
              images={product.secondaryImages}
              currentIndex={selectedImageIndex - 1}
              onImageSelect={handleImageSelect}
            />
          )}
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col justify-center gap-6">
          <ProductInfo
            name={product.name}
            price={product.price}
            description={product.description}
          />

          {/* Add to Cart Section */}
          <div
            className="bg-muted/30 flex flex-col gap-4 rounded-lg border p-4"
            role="region"
            aria-label="Adicionar ao carrinho"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="quantity-selector" className="text-sm font-medium">
                Quantidade
              </label>
              <QuantitySelector
                value={quantity}
                onChange={handleQuantityChange}
                min={1}
                max={99}
                className="w-fit"
              />
            </div>

            <AddToCartButton productId={product.id} quantity={quantity} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className={cn('bg-card rounded-xl border p-6 shadow-sm md:p-8', 'flex flex-col gap-8')}
        aria-label="Entre em contato"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">Entre em Contato</h2>
          <p className="text-muted-foreground">
            Tem alguma dúvida sobre nossos produtos? Envie uma mensagem e entraremos em contato em
            breve!
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-12">
          {/* Contact Form */}
          <ContactForm className="w-full" />

          {/* Separator */}
          <Separator orientation="vertical" className="hidden md:block" />
          <Separator orientation="horizontal" className="md:hidden" />

          {/* Contact Info */}
          <ContactInfo className="w-full" />
        </div>
      </section>

      {/* Image Zoom Modal */}
      <ProductImageZoom
        images={allImages}
        currentIndex={selectedImageIndex}
        isOpen={isZoomOpen}
        onClose={handleZoomClose}
        onNavigate={handleZoomNavigate}
      />
    </div>
  );
}

export { HomePage };
