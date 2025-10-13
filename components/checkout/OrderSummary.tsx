'use client';

import React from 'react';
import Image from 'next/image';
import { CartItem } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingMethodName?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  shippingMethodName,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

      {/* Items List */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-3">
            <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                sizes="64px"
                className="object-cover"
              />
              {item.quantity > 1 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-forest-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {item.quantity}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item.product.name}
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                Qty: {item.quantity} × {formatCurrency(item.product.price)}
              </p>
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {formatCurrency(item.product.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-300 pt-4 space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <div>
            <span>Shipping</span>
            {shippingMethodName && (
              <span className="text-xs text-gray-500 block">{shippingMethodName}</span>
            )}
          </div>
          <span className="font-semibold">
            {shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              formatCurrency(shipping)
            )}
          </span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Tax (8%)</span>
          <span className="font-semibold">{formatCurrency(tax)}</span>
        </div>

        <div className="border-t border-gray-300 pt-3">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Free Shipping Badge */}
      {shipping === 0 && subtotal >= 50 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-800 text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">You're getting free shipping!</span>
          </div>
        </div>
      )}
    </div>
  );
};
