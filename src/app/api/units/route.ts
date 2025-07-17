import { db } from '@/db';
import { units } from '@/db/schema';

export async function GET() {
  const result = await db.select().from(units);
  return Response.json(result);
}
