import { Pool } from 'pg';
import { DB } from './env.js';

const pool = new Pool({
  host: DB.HOST,
  port: DB.PORT,
  user: DB.USER,
  password: DB.PASSWORD,
  database: DB.NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

pool.on('connect', () => {
  console.log('✅ Connected to the PostgreSQL database.');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err);
});

export const query = (text, params) => pool.query(text, params);

export default pool;