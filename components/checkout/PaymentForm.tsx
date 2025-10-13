'use client';

import React from 'react';
import { PaymentMethod } from '@/types';
import { CreditCard } from 'lucide-react';

interface PaymentFormProps {
  paymentMethod: PaymentMethod;
  onChange: (field: keyof PaymentMethod, value: string) => void;
  onTypeChange: (type: 'card' | 'paypal' | 'apple-pay') => void;
  errors: Partial<Record<keyof PaymentMethod, string>>;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentMethod,
  onChange,
  onTypeChange,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>

      {/* Payment Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Credit Card */}
        <button
          type="button"
          onClick={() => onTypeChange('card')}
          className={`p-4 border-2 rounded-lg text-center transition-all ${
            paymentMethod.type === 'card'
              ? 'border-forest-600 bg-forest-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-700" />
          <span className="font-medium text-gray-900">Credit Card</span>
        </button>

        {/* PayPal */}
        <button
          type="button"
          onClick={() => onTypeChange('paypal')}
          className={`p-4 border-2 rounded-lg text-center transition-all ${
            paymentMethod.type === 'paypal'
              ? 'border-forest-600 bg-forest-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <svg className="w-8 h-8 mx-auto mb-2" viewBox="0 0 24 24" fill="#003087">
            <path d="M20.905 9.5c.21-1.337.09-2.245-.476-3.015C19.616 5.49 18.341 5 16.5 5H9.23c-.48 0-.888.347-.963.817l-2.84 18a.75.75 0 00.74.865h5.345l-.289 1.833c-.065.41.256.785.671.785h4.388c.416 0 .77-.3.838-.709l1.421-8.91c.837-.06 1.59-.28 2.243-.628 1.226-.653 2.059-1.794 2.272-3.12.06-.378.09-.76.09-1.149 0-.175-.007-.35-.02-.524z"/>
          </svg>
          <span className="font-medium text-gray-900">PayPal</span>
        </button>

        {/* Apple Pay */}
        <button
          type="button"
          onClick={() => onTypeChange('apple-pay')}
          className={`p-4 border-2 rounded-lg text-center transition-all ${
            paymentMethod.type === 'apple-pay'
              ? 'border-forest-600 bg-forest-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <svg className="w-8 h-8 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          <span className="font-medium text-gray-900">Apple Pay</span>
        </button>
      </div>

      {/* Credit Card Form */}
      {paymentMethod.type === 'card' && (
        <div className="space-y-4 pt-4">
          {/* Card Number */}
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Card Number *
            </label>
            <input
              type="text"
              id="cardNumber"
              value={paymentMethod.cardNumber || ''}
              onChange={(e) => onChange('cardNumber', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-colors ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
            )}
          </div>

          {/* Card Name */}
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder Name *
            </label>
            <input
              type="text"
              id="cardName"
              value={paymentMethod.cardName || ''}
              onChange={(e) => onChange('cardName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-colors ${
                errors.cardName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Doe"
            />
            {errors.cardName && (
              <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Expiry Date */}
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date *
              </label>
              <input
                type="text"
                id="expiryDate"
                value={paymentMethod.expiryDate || ''}
                onChange={(e) => onChange('expiryDate', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-colors ${
                  errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
              )}
            </div>

            {/* CVV */}
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                CVV *
              </label>
              <input
                type="text"
                id="cvv"
                value={paymentMethod.cvv || ''}
                onChange={(e) => onChange('cvv', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-colors ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-sm text-blue-900">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>
      )}

      {/* PayPal Info */}
      {paymentMethod.type === 'paypal' && (
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <p className="text-gray-700 mb-4">
            You will be redirected to PayPal to complete your purchase securely.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Secure checkout with PayPal</span>
          </div>
        </div>
      )}

      {/* Apple Pay Info */}
      {paymentMethod.type === 'apple-pay' && (
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <p className="text-gray-700 mb-4">
            Use your Apple device to complete payment quickly and securely.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Secure checkout with Apple Pay</span>
          </div>
        </div>
      )}
    </div>
  );
};
