import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/session';

export async function GET() {
  try {
    return NextResponse.json({ user: await getSessionUser() });
  } catch (error) {
    console.error('[API] Session lookup error:', error);
    return NextResponse.json({ error: 'Could not load your session' }, { status: 500 });
  }
}
