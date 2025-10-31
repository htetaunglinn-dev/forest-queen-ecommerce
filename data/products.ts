import { Product, Category, TrustIndicator, FooterSection, SocialLink, NavigationItem } from '@/types';

/**
 * Product and Category Images
 *
 * All product and category images are sourced from Unsplash.
 * When using the full Unsplash API with search, proper attribution is required.
 *
 * For dynamic images via API:
 * - Use the Unsplash service in src/services/unsplash.ts
 * - Display photographer attribution using the UnsplashAttribution component
 * - Trigger download tracking when images are displayed
 *
 * Current static URLs are from Unsplash and follow their guidelines.
 */

export const categories: Category[] = [
  {
    id: '1',
    name: 'Tents & Shelters',
    slug: 'tents-shelters',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=400&fit=crop&q=80',
    description: 'Quality tents and shelters for any adventure'
  },
  {
    id: '2',
    name: 'Sleeping Gear',
    slug: 'sleeping-gear',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&h=400&fit=crop&q=80',
    description: 'Stay warm and rest well outdoors'
  },
  {
    id: '3',
    name: 'Backpacks & Bags',
    slug: 'backpacks-bags',
    image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=400&h=400&fit=crop&q=80',
    description: 'Carry your gear comfortably'
  },
  {
    id: '4',
    name: 'Cooking Equipment',
    slug: 'cooking-equipment',
    image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=400&h=400&fit=crop&q=80',
    description: 'Cook delicious meals in the wild'
  },
  {
    id: '5',
    name: 'Hiking Footwear',
    slug: 'hiking-footwear',
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop&q=80',
    description: 'Boots and shoes for every terrain'
  },
  {
    id: '6',
    name: 'Camping Accessories',
    slug: 'camping-accessories',
    image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=400&h=400&fit=crop&q=80',
    description: 'Essential gear and tools'
  }
];

export const products: Product[] = [
  // Tents & Shelters
  {
    id: '1',
    name: 'Alpine Summit 4-Person Tent',
    description: 'Spacious 4-person tent with excellent weather protection and easy setup. Perfect for family camping trips with durable ripstop fabric.',
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=800&fit=crop&q=80',
    category: 'tents-shelters',
    inStock: true,
    badges: ['Best Seller', 'Sale']
  },
  {
    id: '2',
    name: 'UltraLight Solo Tent',
    description: 'Compact and lightweight tent designed for solo backpackers. Weighs only 2.5 lbs with waterproof rainfly.',
    price: 179.99,
    rating: 4.6,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=800&fit=crop&q=80',
    category: 'tents-shelters',
    inStock: true,
    badges: ['New']
  },
  {
    id: '3',
    name: 'Family Dome 6-Person Tent',
    description: 'Large family tent with two rooms, extended vestibule, and weather-resistant construction.',
    price: 249.99,
    rating: 4.7,
    reviewCount: 215,
    image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=800&h=800&fit=crop&q=80',
    category: 'tents-shelters',
    inStock: true
  },

  // Sleeping Gear
  {
    id: '4',
    name: 'Arctic Explorer -20°F Sleeping Bag',
    description: 'Premium down sleeping bag rated for extreme cold. Ultra-warm and compressible with draft collar.',
    price: 249.99,
    originalPrice: 329.99,
    discount: 24,
    rating: 4.9,
    reviewCount: 267,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=800&fit=crop&q=80',
    category: 'sleeping-gear',
    inStock: true,
    badges: ['Premium', 'Sale']
  },
  {
    id: '5',
    name: 'Summer Breeze Sleeping Bag',
    description: 'Lightweight sleeping bag perfect for warm weather camping. Packs down small and includes compression sack.',
    price: 79.99,
    rating: 4.5,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=800&fit=crop&q=80',
    category: 'sleeping-gear',
    inStock: true
  },
  {
    id: '6',
    name: 'Self-Inflating Sleeping Pad',
    description: 'Comfortable foam-core sleeping pad with self-inflating design. 3-inch thickness for ultimate comfort.',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.6,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=800&h=800&fit=crop&q=80',
    category: 'sleeping-gear',
    inStock: true,
    badges: ['Sale']
  },

  // Backpacks & Bags
  {
    id: '7',
    name: 'Expedition Pro 75L Backpack',
    description: 'Heavy-duty backpack with 75L capacity, adjustable suspension system, and hydration compatibility.',
    price: 199.99,
    rating: 4.7,
    reviewCount: 456,
    image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=800&h=800&fit=crop&q=80',
    category: 'backpacks-bags',
    inStock: true,
    badges: ['Best Seller']
  },
  {
    id: '8',
    name: 'DayTripper 30L Pack',
    description: 'Versatile daypack perfect for hiking and daily adventures. Multiple compartments and breathable back panel.',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.6,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&q=80',
    category: 'backpacks-bags',
    inStock: true,
    badges: ['Sale']
  },
  {
    id: '9',
    name: 'Summit 45L Trekking Pack',
    description: 'Mid-size backpack ideal for weekend trips. Features top and front loading access with rain cover included.',
    price: 139.99,
    rating: 4.8,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=800&h=800&fit=crop&q=80',
    category: 'backpacks-bags',
    inStock: true,
    badges: ['New']
  },

  // Cooking Equipment
  {
    id: '10',
    name: 'Camp Chef Stove System',
    description: 'Compact camping stove with integrated cookware. Boils water in under 3 minutes with piezo ignition.',
    price: 129.99,
    rating: 4.8,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=800&h=800&fit=crop&q=80',
    category: 'cooking-equipment',
    inStock: true,
    badges: ['Best Seller']
  },
  {
    id: '11',
    name: 'Titanium Cook Set',
    description: 'Ultra-lightweight titanium cookware set for backpackers. Includes pot, pan, utensils, and nesting design.',
    price: 89.99,
    rating: 4.7,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=800&h=800&fit=crop&q=80',
    category: 'cooking-equipment',
    inStock: true,
    badges: ['Premium']
  },
  {
    id: '12',
    name: 'Portable Water Filter',
    description: 'Advanced water filtration system removes 99.9% of bacteria and parasites. Flow rate of 1L per minute.',
    price: 44.99,
    originalPrice: 64.99,
    discount: 31,
    rating: 4.9,
    reviewCount: 523,
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=800&h=800&fit=crop&q=80',
    category: 'cooking-equipment',
    inStock: true,
    badges: ['Sale']
  },

  // Hiking Footwear
  {
    id: '13',
    name: 'TrailBlazer Hiking Boots',
    description: 'Waterproof hiking boots with excellent ankle support and Vibram soles. Gore-Tex lined for breathability.',
    price: 159.99,
    originalPrice: 199.99,
    discount: 20,
    rating: 4.6,
    reviewCount: 523,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=800&fit=crop&q=80',
    category: 'hiking-footwear',
    inStock: true,
    badges: ['Sale']
  },
  {
    id: '14',
    name: 'Summit Peak Mountaineering Boots',
    description: 'Professional-grade mountaineering boots for serious climbers. Insulated and crampon-compatible.',
    price: 349.99,
    rating: 4.9,
    reviewCount: 187,
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&h=800&fit=crop&q=80',
    category: 'hiking-footwear',
    inStock: true,
    badges: ['Premium']
  },

  // Camping Accessories
  {
    id: '15',
    name: 'Headlamp Pro 500',
    description: 'Powerful 500-lumen headlamp with multiple modes and USB rechargeable battery. IPX6 waterproof rated.',
    price: 49.99,
    rating: 4.7,
    reviewCount: 678,
    image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800&h=800&fit=crop&q=80',
    category: 'camping-accessories',
    inStock: true,
    badges: ['Best Seller']
  },
  {
    id: '16',
    name: 'Multi-Tool Adventure Kit',
    description: 'Versatile multi-tool with 15 functions. Includes knife, pliers, screwdrivers, bottle opener, and more.',
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    rating: 4.5,
    reviewCount: 421,
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&h=800&fit=crop&q=80',
    category: 'camping-accessories',
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
      { label: 'Tents & Shelters', href: '/categories/tents-shelters' },
      { label: 'Sleeping Gear', href: '/categories/sleeping-gear' },
      { label: 'Backpacks & Bags', href: '/categories/backpacks-bags' },
      { label: 'Cooking Equipment', href: '/categories/cooking-equipment' },
      { label: 'Hiking Footwear', href: '/categories/hiking-footwear' },
      { label: 'Camping Accessories', href: '/categories/camping-accessories' }
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
      { label: 'Tents & Shelters', href: '/categories/tents-shelters' },
      { label: 'Sleeping Gear', href: '/categories/sleeping-gear' },
      { label: 'Backpacks & Bags', href: '/categories/backpacks-bags' },
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
