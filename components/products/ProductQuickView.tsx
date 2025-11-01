'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { X, ShoppingCart, Minus, Plus } from 'lucide-react';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { getBadgeVariant } from '@/lib/utils';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const discountPercentage = product.discount || (
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0
  );

  const handleIncrease = () => setQuantity(q => q + 1);
  const handleDecrease = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast({
        variant: 'success',
        title: 'Added to cart!',
        description: `${quantity} ${quantity > 1 ? 'items' : 'item'} of ${product.name} added to your cart.`,
        duration: 3000,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden transform transition-all">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {discountPercentage > 0 && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold z-10">
                  -{discountPercentage}%
                </div>
              )}
              {product.badges && product.badges.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.badges.map((badge, index) => (
                    <Badge key={index} variant={getBadgeVariant(badge)}>
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              {/* Category */}
              <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wide mb-2">
                {product.category.replace('-', ' ')}
              </p>

              {/* Product Name */}
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="mb-4">
                <StarRating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  size={20}
                />
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold text-emerald-700">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <span className="inline-flex items-center gap-2 text-emerald-600 font-medium">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full" />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-red-600 font-medium">
                    <span className="w-2 h-2 bg-red-600 rounded-full" />
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDecrease}
                    className="p-2 border-2 border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="p-2 border-2 border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                size="lg"
                className="w-full mb-4"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} className="mr-2" />
                {product.inStock ? `Add ${quantity} to Cart` : 'Out of Stock'}
              </Button>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                <p>✓ Free shipping on orders over $50</p>
                <p>✓ 30-day return policy</p>
                <p>✓ Secure payment guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
