import { db } from "@/db";
import { ingredientGroupColors} from "@/db/schema";


export async function GET() {
  const result = await db.select().from(ingredientGroupColors);
  return Response.json(result);
}