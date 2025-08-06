import { db } from "@/db";
import { ingredients } from "@/db/schema";
import { IngredientSchema } from "@/schemas/ingredient-schema";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const result = IngredientSchema.safeParse(body);
    if (!result.success) {
      return Response.json(
        { error: "Invalid data", details: result.error },
        { status: 400 }
      );
    }

    const { name, ingredientGroupId, unitId, pricePerUnit } = result.data;

    await db.insert(ingredients).values({
      name,
      ingredientGroupId,
      unitId,
      pricePerUnit,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("POST /api/ingredients error:", error);
    return Response.json(
      { error: "データの登録に失敗しました" },
      { status: 500 }
    );
  }
}

export const GET = async () => {
  try {
    const result = await db.select().from(ingredients);

    return Response.json(result);
  } catch (error) {
    console.error("GET /api/ingredients error:", error);
    return Response.json(
      { error: "データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
