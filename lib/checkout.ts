import { getStripe } from '@/lib/stripe';
import { OrderDraft } from '@/types';

const CURRENCY = 'usd';

const toCents = (amount: number) => Math.round(amount * 100);

export async function createCheckoutSession(orderId: string, order: OrderDraft, origin: string): Promise<string> {
  const session = await getStripe().checkout.sessions.create(
    {
      mode: 'payment',
      client_reference_id: orderId,
      metadata: { orderId, orderNumber: order.orderNumber },
      customer_email: order.shippingAddress.email,
      line_items: [
        ...order.items.map(({ product, quantity }) => ({
          quantity,
          price_data: {
            currency: CURRENCY,
            unit_amount: toCents(product.price),
            product_data: { name: product.name, images: [product.image] },
          },
        })),
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: toCents(order.tax),
            product_data: { name: 'Sales tax' },
          },
        },
      ],
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: order.shippingMethod.name,
            fixed_amount: { amount: toCents(order.shipping), currency: CURRENCY },
          },
        },
      ],
      success_url: `${origin}/order-confirmation?order=${orderId}`,
      cancel_url: `${origin}/checkout`,
    },
    { idempotencyKey: `checkout-${orderId}` },
  );

  if (!session.url) throw new Error('Stripe did not return a checkout URL');
  return session.url;
}
