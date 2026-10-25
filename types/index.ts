export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  inStock: boolean;
  badges?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

export interface TrustIndicator {
  icon: string;
  title: string;
  description: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export const PAYMENT_TYPE = {
  card: 'card',
  paypal: 'paypal',
  applePay: 'apple-pay',
} as const;

export type PaymentType = (typeof PAYMENT_TYPE)[keyof typeof PAYMENT_TYPE];

export interface PaymentSummary {
  type: PaymentType;
  cardName?: string;
  last4?: string;
}

export interface CreateOrderRequest {
  items: Array<{ productId: string; quantity: number }>;
  shippingAddress: ShippingAddress;
  shippingMethodId: string;
  payment: PaymentSummary;
}

export interface OrderDraft {
  orderNumber: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentSummary;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface PlacedOrder extends OrderDraft {
  id: string;
  date: string;
  status: Order['status'];
}

export interface PaymentMethod {
  type: PaymentType;
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: Date;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}
