import { db } from "@/db";
import { ingredientGroups } from "@/db/schema";


export const GET = async () => {
  const result = await db.select().from(ingredientGroups);
  return Response.json(result);
}