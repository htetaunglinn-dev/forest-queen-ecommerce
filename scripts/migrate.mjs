import { readFileSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);
const schema = readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8');
for (const statement of schema.split(';').filter((s) => s.trim())) {
  await sql.query(statement);
}
console.log('orders table ready');
