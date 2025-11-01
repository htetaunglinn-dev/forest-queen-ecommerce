'use client';

import * as React from 'react';
import { X } from 'lucide-react';

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success';
  onClose?: () => void;
}

export function Toast({
  title,
  description,
  action,
  variant = 'default',
  onClose,
}: Omit<ToastProps, 'id'>) {
  const variantStyles = {
    default: 'bg-white border-gray-200',
    destructive: 'bg-red-50 border-red-200',
    success: 'bg-green-50 border-green-200',
  };

  const titleStyles = {
    default: 'text-gray-900',
    destructive: 'text-red-900',
    success: 'text-green-900',
  };

  const descriptionStyles = {
    default: 'text-gray-600',
    destructive: 'text-red-600',
    success: 'text-green-600',
  };

  return (
    <div
      className={`
        pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg
        ${variantStyles[variant]}
        animate-in slide-in-from-right duration-300
      `}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {variant === 'success' && (
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
          <div className="flex-1">
            {title && (
              <p className={`text-sm font-semibold ${titleStyles[variant]}`}>
                {title}
              </p>
            )}
            {description && (
              <p className={`text-sm mt-1 ${descriptionStyles[variant]}`}>
                {description}
              </p>
            )}
            {action && <div className="mt-3">{action}</div>}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 rounded-md p-1 hover:bg-gray-100 transition-colors"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
