import { db } from "@/db";
import { ingredientGroups } from "@/db/schema";


export async function GET() {
  const result = await db.select().from(ingredientGroups);
  return Response.json(result);
}