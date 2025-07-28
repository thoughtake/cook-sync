import { db } from '@/db';
import { units } from '@/db/schema';

export const GET = async () => {
  const result = await db.select().from(units);
  return Response.json(result);
}
