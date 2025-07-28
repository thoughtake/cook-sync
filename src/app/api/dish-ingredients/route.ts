import { db } from "@/db";
import { dishIngredients } from "@/db/schema";

export const GET = async () => {
  try {
    const result = await db.select().from(dishIngredients);

    return Response.json(result);
  } catch (err) {
    console.error("GET /api/dish-ingredients  error:", err);
    return Response.json(
      { error: "データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
