import { readFileSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);
await sql.query(readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8'));
console.log('orders table ready');
