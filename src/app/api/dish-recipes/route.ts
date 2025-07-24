import { db } from "@/db";
import { dishRecipes } from "@/db/schema";

export async function GET() {
  try {
    const result = await db.select().from(dishRecipes);

    return Response.json(result);
  } catch (err) {
    console.error("GET /api/dish-recipes  error:", err);
    return Response.json(
      { error: "データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
