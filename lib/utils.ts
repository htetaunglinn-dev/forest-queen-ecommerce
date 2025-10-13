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
