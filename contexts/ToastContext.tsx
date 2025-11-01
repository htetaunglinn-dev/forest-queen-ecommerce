'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ToastProps } from '@/components/ui/toast';

type ToasterToast = ToastProps & {
  id: string;
};

interface ToastContextType {
  toasts: ToasterToast[];
  toast: (options: Omit<ToastProps, 'id' | 'onClose'> & { duration?: number }) => string;
  dismiss: (toastId: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastCount = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToasterToast[]>([]);

  const toast = useCallback(
    ({
      title,
      description,
      action,
      variant = 'default',
      duration = 3000,
    }: Omit<ToastProps, 'id' | 'onClose'> & { duration?: number }) => {
      const id = `toast-${toastCount++}`;
      const newToast: ToasterToast = {
        id,
        title,
        description,
        action,
        variant,
      };

      setToasts((prevToasts) => [...prevToasts, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }

      return id;
    },
    []
  );

  const dismiss = useCallback((toastId: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toastId));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
