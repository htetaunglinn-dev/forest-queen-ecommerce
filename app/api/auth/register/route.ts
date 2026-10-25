import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';
import { parseRegistration, registerUser } from '@/lib/auth';
import { startSession } from '@/lib/session';
import { RATE_LIMIT_SCOPE } from '@/types';

const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 1000;

export async function POST(request: NextRequest) {
  const rateLimitResponse = checkRateLimit(request, RATE_LIMIT, RATE_WINDOW, RATE_LIMIT_SCOPE.register);
  if (rateLimitResponse) {
    console.log(`[API] Register rate limit exceeded for IP: ${getClientIP(request)}`);
    return rateLimitResponse;
  }

  const result = parseRegistration(await request.json().catch(() => null));
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  try {
    const user = await registerUser(result.input);
    if (!user) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }
    await startSession(user.id);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('[API] Register error:', error);
    return NextResponse.json({ error: 'Could not create your account' }, { status: 500 });
  }
}
