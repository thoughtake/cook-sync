import { db } from "@/db";
import { ingredients } from "@/db/schema";
import { IngredientSchema } from "@/schemas/ingredient-schema";
import { eq } from "drizzle-orm";
import { deleteHandler } from "../../delete-handler";

export const DELETE = async (
  req: Request,
  {params}: { params: Promise<{id: string}> }
) => {

  const id = (await params).id;
  
  return await deleteHandler({
    table: ingredients,
    column: ingredients.id,
    id: id
  })

}

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
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
