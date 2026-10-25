'use client';

import React from 'react';
import { Lock } from 'lucide-react';

export const PaymentForm: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>

      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900 space-y-1">
          <p className="font-medium">You&apos;ll pay on Stripe&apos;s secure checkout page.</p>
          <p>Card, Apple Pay and Google Pay are accepted. We never see or store your card details.</p>
        </div>
      </div>
    </div>
  );
};
