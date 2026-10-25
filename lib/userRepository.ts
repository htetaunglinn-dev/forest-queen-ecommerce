import { getSql } from '@/lib/db';
import { StoredUser, User } from '@/types';

export async function insertUser(name: string, email: string, passwordHash: string): Promise<User | null> {
  const sql = getSql();
  const [row] = await sql`
    INSERT INTO users (name, email, password_hash)
    VALUES (${name}, ${email}, ${passwordHash})
    ON CONFLICT (email) DO NOTHING
    RETURNING id, name, email
  `;
  return (row as User | undefined) ?? null;
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const sql = getSql();
  const [row] = await sql`
    SELECT id, name, email, password_hash AS "passwordHash"
    FROM users
    WHERE email = ${email}
  `;
  return (row as StoredUser | undefined) ?? null;
}
