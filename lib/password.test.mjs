import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, verifyPassword } from './password.ts';

const PASSWORD = 'correct horse battery staple';
const WRONG_PASSWORD = 'correct horse battery stapler';

test('the hash never contains the password and differs on every call', async () => {
  const first = await hashPassword(PASSWORD);
  const second = await hashPassword(PASSWORD);
  assert.ok(!first.includes(PASSWORD));
  assert.notEqual(first, second);
});

test('verifies the right password and rejects a wrong one', async () => {
  const stored = await hashPassword(PASSWORD);
  assert.equal(await verifyPassword(PASSWORD, stored), true);
  assert.equal(await verifyPassword(WRONG_PASSWORD, stored), false);
});

test('treats the same password typed with different unicode forms as equal', async () => {
  const composed = 'café-password';
  const decomposed = 'café-password';
  assert.equal(await verifyPassword(decomposed, await hashPassword(composed)), true);
});

test('rejects malformed stored hashes instead of throwing or matching', async () => {
  const [salt] = (await hashPassword(PASSWORD)).split(':');
  for (const stored of ['', 'no-colon', `${salt}:`, `${salt}:zz`, `zz:${'ab'.repeat(64)}`]) {
    assert.equal(await verifyPassword(PASSWORD, stored), false, stored);
  }
});
