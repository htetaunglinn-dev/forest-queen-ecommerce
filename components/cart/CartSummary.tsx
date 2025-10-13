'use client';

import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Truck } from 'lucide-react';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onCheckout?: () => void;
  isCheckoutDisabled?: boolean;
  showCheckoutButton?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping,
  tax,
  total,
  onCheckout,
  isCheckoutDisabled = false,
  showCheckoutButton = true,
}) => {
  const freeShippingThreshold = 50;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
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

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Free Shipping Progress */}
      {!qualifiesForFreeShipping && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Truck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-amber-900 font-medium">
                Add {formatCurrency(remainingForFreeShipping)} more for free shipping!
              </p>
              <div className="mt-2 bg-white rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {qualifiesForFreeShipping && shipping === 0 && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-800">
            <Truck className="w-5 h-5" />
            <p className="text-sm font-medium">
              You qualify for free shipping!
            </p>
          </div>
        </div>
      )}

      {/* Checkout Button */}
      {showCheckoutButton && (
        <Button
          onClick={onCheckout}
          size="lg"
          className="w-full"
          disabled={isCheckoutDisabled}
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Proceed to Checkout
        </Button>
      )}

      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <svg className="w-5 h-5 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <svg className="w-5 h-5 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <svg className="w-5 h-5 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>1-year warranty</span>
        </div>
      </div>
    </div>
  );
};
