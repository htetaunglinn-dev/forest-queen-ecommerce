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
  stripe: 'stripe',
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

export const ORDER_STATUS = {
  pending: 'pending',
  paid: 'paid',
  processing: 'processing',
  shipped: 'shipped',
  delivered: 'delivered',
  cancelled: 'cancelled',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface StoredUser extends User {
  passwordHash: string;
}

export interface RegistrationInput {
  name: string;
  email: string;
  password: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export type ParseResult<T> = { input: T } | { error: string };

export interface AuthResponse {
  user: User | null;
}

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (credentials: Credentials) => Promise<User | null>;
  register: (input: RegistrationInput) => Promise<User | null>;
  logout: () => Promise<void>;
}

export const AUTH_MODE = {
  login: 'login',
  signup: 'signup',
} as const;

export type AuthMode = (typeof AUTH_MODE)[keyof typeof AUTH_MODE];

export const MIN_PASSWORD_LENGTH = 8;

export const RATE_LIMIT_SCOPE = {
  login: 'login',
  register: 'register',
} as const;

export const STRIPE_EVENT = {
  checkoutCompleted: 'checkout.session.completed',
  checkoutAsyncPaymentSucceeded: 'checkout.session.async_payment_succeeded',
} as const;

export const STRIPE_PAYMENT_STATUS = {
  paid: 'paid',
} as const;

export interface PlacedOrder extends OrderDraft {
  id: string;
  date: string;
  status: OrderStatus;
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
  status: OrderStatus;
}
