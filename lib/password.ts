import { randomBytes, scrypt, timingSafeEqual, type ScryptOptions } from 'node:crypto';

const SALT_BYTES = 16;
const KEY_BYTES = 64;
const SCRYPT_OPTIONS: ScryptOptions = { N: 2 ** 17, r: 8, p: 1, maxmem: 256 * 1024 * 1024 };

const deriveKey = (password: string, salt: Buffer) =>
  new Promise<Buffer>((resolve, reject) =>
    scrypt(password.normalize('NFKC'), salt, KEY_BYTES, SCRYPT_OPTIONS, (error, key) => (error ? reject(error) : resolve(key))),
  );

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_BYTES);
  const key = await deriveKey(password, salt);
  return `${salt.toString('hex')}:${key.toString('hex')}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [saltHex, keyHex] = storedHash.split(':');
  const salt = Buffer.from(saltHex ?? '', 'hex');
  const expected = Buffer.from(keyHex ?? '', 'hex');
  if (salt.length !== SALT_BYTES || expected.length !== KEY_BYTES) return false;

  return timingSafeEqual(await deriveKey(password, salt), expected);
}
