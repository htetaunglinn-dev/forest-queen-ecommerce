import { createHash, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { deleteSession, findUserBySessionTokenHash, insertSession } from '@/lib/sessionRepository';
import { User } from '@/types';

const SESSION_COOKIE = 'fq_session';
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');

export async function startSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await insertSession(hashToken(token), userId, expiresAt);

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

export async function getSessionUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return findUserBySessionTokenHash(hashToken(token));
}

export async function endSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) await deleteSession(hashToken(token));
  cookieStore.delete(SESSION_COOKIE);
}
