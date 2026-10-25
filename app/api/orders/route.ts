import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';
import { buildOrder } from '@/lib/orders';
import { insertOrder } from '@/lib/orderRepository';
import { createCheckoutSession } from '@/lib/checkout';

const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 1000;

export async function POST(request: NextRequest) {
  const rateLimitResponse = checkRateLimit(request, RATE_LIMIT, RATE_WINDOW);
  if (rateLimitResponse) {
    console.log(`[API] Rate limit exceeded for IP: ${getClientIP(request)}`);
    return rateLimitResponse;
  }

  const body = await request.json().catch(() => null);
  const result = buildOrder(body);
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  try {
    const id = await insertOrder(result.order);
    const checkoutUrl = await createCheckoutSession(id, result.order, request.nextUrl.origin);
    return NextResponse.json({ id, orderNumber: result.order.orderNumber, checkoutUrl }, { status: 201 });
  } catch (error) {
    console.error('[API] Create order error:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
