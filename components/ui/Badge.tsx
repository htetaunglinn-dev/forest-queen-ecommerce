import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sale' | 'new' | 'premium' | 'bestseller';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'sale', className = '' }) => {
  const variants = {
    sale: 'bg-red-500 text-white',
    new: 'bg-blue-500 text-white',
    premium: 'bg-amber-500 text-white',
    bestseller: 'bg-emerald-500 text-white'
  };

  return (
    <span className={`px-2 py-1 text-xs font-bold rounded-md uppercase ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
