import 'dotenv/config';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

export async function initDb() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  return drizzle(connection);
}
