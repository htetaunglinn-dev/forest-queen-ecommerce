import { NextResponse } from 'next/server';
import { endSession } from '@/lib/session';

export async function POST() {
  try {
    await endSession();
    return NextResponse.json({ user: null });
  } catch (error) {
    console.error('[API] Logout error:', error);
    return NextResponse.json({ error: 'Could not sign you out' }, { status: 500 });
  }
}
