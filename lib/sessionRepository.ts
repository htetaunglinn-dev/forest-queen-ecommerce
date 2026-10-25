import { getSql } from '@/lib/db';
import { User } from '@/types';

export async function insertSession(tokenHash: string, userId: string, expiresAt: Date): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO sessions (token_hash, user_id, expires_at)
    VALUES (${tokenHash}, ${userId}, ${expiresAt.toISOString()})
  `;
}

export async function findUserBySessionTokenHash(tokenHash: string): Promise<User | null> {
  const sql = getSql();
  const [row] = await sql`
    SELECT users.id, users.name, users.email
    FROM sessions
    JOIN users ON users.id = sessions.user_id
    WHERE sessions.token_hash = ${tokenHash} AND sessions.expires_at > now()
  `;
  return (row as User | undefined) ?? null;
}

export async function deleteSession(tokenHash: string): Promise<void> {
  const sql = getSql();
  await sql`DELETE FROM sessions WHERE token_hash = ${tokenHash}`;
}
