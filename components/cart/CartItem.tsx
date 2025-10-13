'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Trash2, Minus, Plus } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      onUpdateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="flex gap-4 py-6 border-b border-gray-200 last:border-0">
      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="flex-shrink-0">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 96px, 128px"
            className="object-cover"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <Link
                href={`/products/${product.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-forest-600 transition-colors"
              >
                {product.name}
              </Link>
              <p className="text-sm text-gray-600 mt-1">{product.category}</p>
              {product.discount && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-semibold text-red-600">
                    Save {product.discount}%
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(itemTotal)}
              </p>
              <p className="text-sm text-gray-500">
                {formatCurrency(product.price)} each
              </p>
            </div>
          </div>
        </div>

        {/* Quantity Controls and Remove */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Control */}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(product.id)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
            aria-label="Remove from cart"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <p className="text-red-600 text-sm font-medium mt-2">Out of stock</p>
        )}
      </div>
    </div>
  );
};
