import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { markOrderPaid } from '@/lib/orderRepository';
import { STRIPE_EVENT, STRIPE_PAYMENT_STATUS } from '@/types';

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[Stripe] STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch (error) {
    console.error('[Stripe] Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === STRIPE_EVENT.checkoutCompleted || event.type === STRIPE_EVENT.checkoutAsyncPaymentSucceeded) {
    const session = event.data.object;
    if (session.payment_status === STRIPE_PAYMENT_STATUS.paid && session.client_reference_id) {
      try {
        const updated = await markOrderPaid(session.client_reference_id, session.id);
        console.log(`[Stripe] ${event.type} for order ${session.client_reference_id}: ${updated ? 'marked paid' : 'already handled'}`);
      } catch (error) {
        console.error('[Stripe] Failed to mark order paid:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
