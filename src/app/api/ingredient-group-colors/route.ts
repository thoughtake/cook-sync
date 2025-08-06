import { db } from "@/db";
import { ingredientGroupColors} from "@/db/schema";


export const GET = async () => {
  const result = await db.select().from(ingredientGroupColors);
  return Response.json(result);
}