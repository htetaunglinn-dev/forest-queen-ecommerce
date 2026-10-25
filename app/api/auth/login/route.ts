import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';
import { authenticate, parseCredentials } from '@/lib/auth';
import { startSession } from '@/lib/session';
import { RATE_LIMIT_SCOPE } from '@/types';

const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 1000;

export async function POST(request: NextRequest) {
  const rateLimitResponse = checkRateLimit(request, RATE_LIMIT, RATE_WINDOW, RATE_LIMIT_SCOPE.login);
  if (rateLimitResponse) {
    console.log(`[API] Login rate limit exceeded for IP: ${getClientIP(request)}`);
    return rateLimitResponse;
  }

  const result = parseCredentials(await request.json().catch(() => null));
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  try {
    const user = await authenticate(result.input);
    if (!user) {
      return NextResponse.json({ error: 'Incorrect email or password' }, { status: 401 });
    }
    await startSession(user.id);
    return NextResponse.json({ user });
  } catch (error) {
    console.error('[API] Login error:', error);
    return NextResponse.json({ error: 'Could not sign you in' }, { status: 500 });
  }
}
