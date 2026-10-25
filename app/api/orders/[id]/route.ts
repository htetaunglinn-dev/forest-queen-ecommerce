import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';
import { findOrderById } from '@/lib/orderRepository';

const RATE_LIMIT = 30;
const RATE_WINDOW = 60 * 1000;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const rateLimitResponse = checkRateLimit(request, RATE_LIMIT, RATE_WINDOW);
  if (rateLimitResponse) {
    console.log(`[API] Rate limit exceeded for IP: ${getClientIP(request)}`);
    return rateLimitResponse;
  }

  const { id } = await params;
  if (!UUID_PATTERN.test(id)) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  try {
    const order = await findOrderById(id);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error) {
    console.error('[API] Get order error:', error);
    return NextResponse.json({ error: 'Failed to load order' }, { status: 500 });
  }
}
