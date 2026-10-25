import { products, shippingMethods } from '@/data/products';
import { calculateTax, calculateTotal, generateOrderNumber, isValidEmail } from '@/lib/utils';
import { CartItem, OrderDraft, PAYMENT_TYPE, ShippingAddress } from '@/types';

const MAX_LINE_ITEMS = 50;
const MAX_QUANTITY = 99;
const MAX_FIELD_LENGTH = 200;
const ADDRESS_FIELDS: Array<keyof ShippingAddress> = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'postalCode', 'country'];

type OrderValidation = { order: OrderDraft } | { error: string };

const roundCents = (amount: number) => Math.round(amount * 100) / 100;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isFilledString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0 && value.length <= MAX_FIELD_LENGTH;

function parseItems(value: unknown): CartItem[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_LINE_ITEMS) return null;

  const items: CartItem[] = [];
  for (const entry of value) {
    if (!isRecord(entry)) return null;
    const product = products.find((p) => p.id === entry.productId);
    const { quantity } = entry;
    if (!product || typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) return null;
    items.push({ product, quantity });
  }
  return items;
}

function parseShippingAddress(value: unknown): ShippingAddress | null {
  if (!isRecord(value)) return null;
  if (!ADDRESS_FIELDS.every((field) => isFilledString(value[field]))) return null;

  const address = Object.fromEntries(ADDRESS_FIELDS.map((field) => [field, (value[field] as string).trim()])) as unknown as ShippingAddress;
  return isValidEmail(address.email) ? address : null;
}

export function buildOrder(body: unknown): OrderValidation {
  if (!isRecord(body)) return { error: 'Invalid request body' };

  const items = parseItems(body.items);
  if (!items) return { error: 'Invalid cart items' };

  const shippingAddress = parseShippingAddress(body.shippingAddress);
  if (!shippingAddress) return { error: 'Invalid shipping address' };

  const shippingMethod = shippingMethods.find((method) => method.id === body.shippingMethodId);
  if (!shippingMethod) return { error: 'Invalid shipping method' };

  const subtotal = roundCents(items.reduce((sum, item) => sum + item.product.price * item.quantity, 0));
  const shipping = shippingMethod.price;
  const tax = roundCents(calculateTax(subtotal));

  return {
    order: {
      orderNumber: generateOrderNumber(),
      items,
      shippingAddress,
      shippingMethod,
      paymentMethod: { type: PAYMENT_TYPE.stripe },
      subtotal,
      shipping,
      tax,
      total: roundCents(calculateTotal(subtotal, shipping, tax)),
    },
  };
}
