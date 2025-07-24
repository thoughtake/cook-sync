import 'dotenv/config'; 
import { drizzle } from 'drizzle-orm/mysql2'; 
import mysql from 'mysql2/promise'; 

const connection = await mysql.createConnection(process.env.DATABASE_URL!);

export const db = drizzle(connection);
