import { FakeStoreProduct } from './api';
import { Product, Category } from '@/types';

// Convert FakeStore product to our Product type
export function convertFakeStoreProduct(product: FakeStoreProduct): Product {
  return {
    id: product.id.toString(),
    name: product.title,
    description: product.description,
    price: product.price,
    rating: product.rating.rate,
    reviewCount: product.rating.count,
    image: product.image,
    category: product.category,
    inStock: true,
    badges: determineBadges(product)
  };
}

// Determine product badges based on price and rating
function determineBadges(product: FakeStoreProduct): string[] {
  const badges: string[] = [];

  if (product.rating.rate >= 4.5) {
    badges.push('Best Seller');
  }

  if (product.price < 50) {
    badges.push('Great Deal');
  }

  if (product.rating.count > 200) {
    badges.push('Popular');
  }

  return badges;
}

// Convert FakeStore categories to our Category type with images
export function convertFakeStoreCategory(categoryName: string): Category {
  // Category images mapping
  const categoryImages: Record<string, string> = {
    "electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop",
    "jewelery": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    "men's clothing": "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&h=400&fit=crop",
    "women's clothing": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop"
  };

  const categoryDescriptions: Record<string, string> = {
    "electronics": "Latest tech gadgets and devices",
    "jewelery": "Elegant jewelry pieces",
    "men's clothing": "Stylish men's fashion",
    "women's clothing": "Trendy women's apparel"
  };

  return {
    id: categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    name: capitalizeWords(categoryName),
    slug: categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    image: categoryImages[categoryName] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
    description: categoryDescriptions[categoryName]
  };
}

// Helper function to capitalize words
function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Cart and Order Utility Functions

/**
 * Format a number as currency (USD)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Calculate subtotal from cart items
 */
export const calculateSubtotal = (items: import('@/types').CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
};

/**
 * Calculate shipping cost based on subtotal
 * Free shipping over $50, otherwise $5.99
 */
export const calculateShipping = (subtotal: number, shippingMethodPrice?: number): number => {
  if (shippingMethodPrice !== undefined) {
    return shippingMethodPrice;
  }
  return subtotal >= 50 ? 0 : 5.99;
};

/**
 * Calculate tax (8% for simulation purposes)
 */
export const calculateTax = (subtotal: number): number => {
  const TAX_RATE = 0.08;
  return subtotal * TAX_RATE;
};

/**
 * Calculate order total
 */
export const calculateTotal = (subtotal: number, shipping: number, tax: number): number => {
  return subtotal + shipping + tax;
};

/**
 * Generate a random order number
 */
export const generateOrderNumber = (): string => {
  const prefix = 'FQ';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

/**
 * Format date for order display
 */
export const formatOrderDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Calculate estimated delivery date
 */
export const calculateDeliveryDate = (daysToAdd: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic US format)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate credit card number (basic Luhn algorithm)
 */
export const isValidCardNumber = (cardNumber: string): boolean => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  if (!/^\d{13,19}$/.test(cleanNumber)) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Format card number with spaces
 */
export const formatCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, '');
  const match = cleaned.match(/.{1,4}/g);
  return match ? match.join(' ') : cleaned;
};

/**
 * Get card type from number
 */
export const getCardType = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, '');

  if (/^4/.test(cleaned)) return 'Visa';
  if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
  if (/^3[47]/.test(cleaned)) return 'American Express';
  if (/^6(?:011|5)/.test(cleaned)) return 'Discover';

  return 'Unknown';
};

/**
 * Mask credit card number (show last 4 digits)
 */
export const maskCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, '');
  const lastFour = cleaned.slice(-4);
  return `**** **** **** ${lastFour}`;
};

/**
 * Map badge text to Badge component variant
 * Handles various badge text formats (e.g., "Best Seller", "Sale", "New", "Premium")
 */
export const getBadgeVariant = (badgeText: string): 'sale' | 'new' | 'premium' | 'bestseller' => {
  const normalizedBadge = badgeText.toLowerCase().replace(/\s+/g, '');

  if (normalizedBadge === 'sale') return 'sale';
  if (normalizedBadge === 'new') return 'new';
  if (normalizedBadge === 'premium') return 'premium';
  if (normalizedBadge === 'bestseller') return 'bestseller';

  // Default fallback for unknown badge types
  return 'new';
};
