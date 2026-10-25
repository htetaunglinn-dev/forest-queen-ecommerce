import { randomBytes } from 'node:crypto';
import { hashPassword, verifyPassword } from '@/lib/password';
import { findUserByEmail, insertUser } from '@/lib/userRepository';
import { isValidEmail } from '@/lib/utils';
import { Credentials, MIN_PASSWORD_LENGTH, ParseResult, RegistrationInput, User } from '@/types';

const MAX_PASSWORD_LENGTH = 200;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;

let dummyHash: Promise<string> | undefined;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export function parseRegistration(body: unknown): ParseResult<RegistrationInput> {
  if (!isRecord(body)) return { error: 'Invalid request body' };
  const { name, email, password } = body;

  if (typeof name !== 'string' || !name.trim() || name.length > MAX_NAME_LENGTH) {
    return { error: 'Please enter your name' };
  }
  if (typeof email !== 'string' || email.length > MAX_EMAIL_LENGTH || !isValidEmail(email.trim())) {
    return { error: 'Please enter a valid email address' };
  }
  if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
    return { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` };
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    return { error: `Password must be at most ${MAX_PASSWORD_LENGTH} characters` };
  }

  return { input: { name: name.trim(), email: normalizeEmail(email), password } };
}

export function parseCredentials(body: unknown): ParseResult<Credentials> {
  if (
    !isRecord(body) ||
    typeof body.email !== 'string' ||
    typeof body.password !== 'string' ||
    !body.email.trim() ||
    !body.password ||
    body.email.length > MAX_EMAIL_LENGTH ||
    body.password.length > MAX_PASSWORD_LENGTH
  ) {
    return { error: 'Please enter your email and password' };
  }
  return { input: { email: normalizeEmail(body.email), password: body.password } };
}

export async function registerUser({ name, email, password }: RegistrationInput): Promise<User | null> {
  return insertUser(name, email, await hashPassword(password));
}

export async function authenticate({ email, password }: Credentials): Promise<User | null> {
  const user = await findUserByEmail(email);
  dummyHash ??= hashPassword(randomBytes(16).toString('hex'));
  const passwordMatches = await verifyPassword(password, user?.passwordHash ?? (await dummyHash));
  return user && passwordMatches ? { id: user.id, name: user.name, email: user.email } : null;
}
