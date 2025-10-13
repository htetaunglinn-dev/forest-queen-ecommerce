import { Product, Category, TrustIndicator, FooterSection, SocialLink, NavigationItem } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Tents',
    slug: 'tents',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&h=300&fit=crop',
    description: 'Shelter for your adventures'
  },
  {
    id: '2',
    name: 'Sleeping Bags',
    slug: 'sleeping-bags',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop',
    description: 'Stay warm and comfortable'
  },
  {
    id: '3',
    name: 'Backpacks',
    slug: 'backpacks',
    image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=400&h=300&fit=crop',
    description: 'Carry your gear in style'
  },
  {
    id: '4',
    name: 'Cooking Gear',
    slug: 'cooking-gear',
    image: 'https://images.unsplash.com/photo-1520483691742-bada60a1edd6?w=400&h=300&fit=crop',
    description: 'Meals in the wilderness'
  },
  {
    id: '5',
    name: 'Hiking Boots',
    slug: 'hiking-boots',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
    description: 'Conquer any trail'
  },
  {
    id: '6',
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=400&h=300&fit=crop',
    description: 'Essential outdoor tools'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Alpine Summit 4-Person Tent',
    description: 'Spacious 4-person tent with excellent weather protection and easy setup. Perfect for family camping trips.',
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&h=600&fit=crop',
    category: 'tents',
    inStock: true,
    badges: ['Best Seller', 'Sale']
  },
  {
    id: '2',
    name: 'UltraLight Solo Tent',
    description: 'Compact and lightweight tent designed for solo backpackers. Weighs only 2.5 lbs.',
    price: 179.99,
    rating: 4.6,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=600&fit=crop',
    category: 'tents',
    inStock: true,
    badges: ['New']
  },
  {
    id: '3',
    name: 'Arctic Explorer -20°F Sleeping Bag',
    description: 'Premium down sleeping bag rated for extreme cold. Ultra-warm and compressible.',
    price: 249.99,
    originalPrice: 329.99,
    discount: 24,
    rating: 4.9,
    reviewCount: 267,
    image: 'https://images.unsplash.com/photo-1542307510-b4a8dc2bbbce?w=600&h=600&fit=crop',
    category: 'sleeping-bags',
    inStock: true,
    badges: ['Premium', 'Sale']
  },
  {
    id: '4',
    name: 'Summer Breeze Sleeping Bag',
    description: 'Lightweight sleeping bag perfect for warm weather camping. Packs down small.',
    price: 79.99,
    rating: 4.5,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=600&fit=crop',
    category: 'sleeping-bags',
    inStock: true
  },
  {
    id: '5',
    name: 'Expedition Pro 75L Backpack',
    description: 'Heavy-duty backpack with 75L capacity, adjustable suspension, and hydration compatibility.',
    price: 199.99,
    rating: 4.7,
    reviewCount: 456,
    image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=600&h=600&fit=crop',
    category: 'backpacks',
    inStock: true,
    badges: ['Best Seller']
  },
  {
    id: '6',
    name: 'DayTripper 30L Pack',
    description: 'Versatile daypack perfect for hiking and daily adventures. Multiple compartments.',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.6,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    category: 'backpacks',
    inStock: true,
    badges: ['Sale']
  },
  {
    id: '7',
    name: 'Camp Chef Stove System',
    description: 'Compact camping stove with integrated cookware. Boils water in under 3 minutes.',
    price: 129.99,
    rating: 4.8,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1520483691742-bada60a1edd6?w=600&h=600&fit=crop',
    category: 'cooking-gear',
    inStock: true,
    badges: ['Best Seller']
  },
  {
    id: '8',
    name: 'Titanium Cook Set',
    description: 'Ultra-lightweight titanium cookware set for backpackers. Includes pot, pan, and utensils.',
    price: 89.99,
    rating: 4.7,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1606408909027-f87c8b32a5ea?w=600&h=600&fit=crop',
    category: 'cooking-gear',
    inStock: true,
    badges: ['Premium']
  },
  {
    id: '9',
    name: 'TrailBlazer Hiking Boots',
    description: 'Waterproof hiking boots with excellent ankle support and Vibram soles.',
    price: 159.99,
    originalPrice: 199.99,
    discount: 20,
    rating: 4.6,
    reviewCount: 523,
    image: 'https://images.unsplash.com/photo-1608662999393-4b6b3232b899?w=600&h=600&fit=crop',
    category: 'hiking-boots',
    inStock: true,
    badges: ['Sale']
  },
  {
    id: '10',
    name: 'Summit Peak Boots',
    description: 'Professional-grade mountaineering boots for serious climbers. Insulated and crampon-compatible.',
    price: 349.99,
    rating: 4.9,
    reviewCount: 187,
    image: 'https://images.unsplash.com/photo-1520219576619-a8c77df0e60c?w=600&h=600&fit=crop',
    category: 'hiking-boots',
    inStock: true,
    badges: ['Premium']
  },
  {
    id: '11',
    name: 'Headlamp Pro 500',
    description: 'Powerful 500-lumen headlamp with multiple modes and USB rechargeable battery.',
    price: 49.99,
    rating: 4.7,
    reviewCount: 678,
    image: 'https://images.unsplash.com/photo-1604519191118-45c0c2df2d2d?w=600&h=600&fit=crop',
    category: 'accessories',
    inStock: true,
    badges: ['Best Seller']
  },
  {
    id: '12',
    name: 'Multi-Tool Adventure Kit',
    description: 'Versatile multi-tool with 15 functions. Includes knife, pliers, screwdrivers, and more.',
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    rating: 4.5,
    reviewCount: 421,
    image: 'https://images.unsplash.com/photo-1609455192937-04a322a65256?w=600&h=600&fit=crop',
    category: 'accessories',
    inStock: true,
    badges: ['Sale']
  }
];

export const trustIndicators: TrustIndicator[] = [
  {
    icon: 'truck',
    title: 'Free Shipping',
    description: 'On orders over $50'
  },
  {
    icon: 'refresh-cw',
    title: 'Easy Returns',
    description: '30-day return policy'
  },
  {
    icon: 'headphones',
    title: '24/7 Support',
    description: 'Dedicated customer service'
  },
  {
    icon: 'shield-check',
    title: 'Secure Payment',
    description: '100% secure transactions'
  }
];

export const navigation: NavigationItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Categories',
    href: '/categories',
    children: [
      { label: 'Tents', href: '/categories/tents' },
      { label: 'Sleeping Bags', href: '/categories/sleeping-bags' },
      { label: 'Backpacks', href: '/categories/backpacks' },
      { label: 'Cooking Gear', href: '/categories/cooking-gear' },
      { label: 'Hiking Boots', href: '/categories/hiking-boots' },
      { label: 'Accessories', href: '/categories/accessories' }
    ]
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

export const footerSections: FooterSection[] = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Tents', href: '/categories/tents' },
      { label: 'Sleeping Bags', href: '/categories/sleeping-bags' },
      { label: 'Backpacks', href: '/categories/backpacks' },
      { label: 'New Arrivals', href: '/new' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Blog', href: '/blog' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Track Order', href: '/track' },
      { label: 'Contact Us', href: '/contact' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' }
    ]
  }
];

export const socialLinks: SocialLink[] = [
  { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { name: 'YouTube', href: 'https://youtube.com', icon: 'youtube' }
];
