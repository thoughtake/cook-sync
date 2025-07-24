import { db } from "@/db";
import { ingredients } from "@/db/schema";
import { IngredientSchema } from "@/schemas/ingredient-schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return Response.json({ error: "idが数値ではありません", id }, { status: 400 });
    }

    await db.delete(ingredients).where(eq(ingredients.id, id));

    return Response.json({ success: true, deletedId: id });
  } catch (error) {
    console.error("DELETE /api/ingredients/[id] error:", error);
    return Response.json({ error: "削除に失敗しました" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return Response.json({ error: "idが数値ではありません", id }, { status: 400 });
    }

    const body = await req.json();
    const result = IngredientSchema.safeParse(body);
    if (!result.success) {
      return Response.json(
        { error: "Invalid data", details: result.error, id },
        { status: 400 }
      );
    }

    const { name, ingredientGroupId, unitId, pricePerUnit } = result.data;

    await db
      .update(ingredients)
      .set({
        name,
        ingredientGroupId,
        unitId,
        pricePerUnit,
      })
      .where(eq(ingredients.id, id));

    return Response.json({ success: true, editedId: id });
  } catch (error) {
    console.error("POST /api/ingredients/[id] error:", error);
    return Response.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}
