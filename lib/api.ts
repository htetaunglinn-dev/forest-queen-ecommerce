// FakeStore API integration
const BASE_URL = 'https://fakestoreapi.com';

export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface FakeStoreCategory {
  name: string;
  slug: string;
}

// Fetch all products
export async function getProducts(): Promise<FakeStoreProduct[]> {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch single product by ID
export async function getProduct(id: number): Promise<FakeStoreProduct | null> {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Fetch products by category
export async function getProductsByCategory(category: string): Promise<FakeStoreProduct[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) throw new Error('Failed to fetch products by category');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

// Fetch all categories
export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch limited products for showcase
export async function getFeaturedProducts(limit: number = 8): Promise<FakeStoreProduct[]> {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}`, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) throw new Error('Failed to fetch featured products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}
