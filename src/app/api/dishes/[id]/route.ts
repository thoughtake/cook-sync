import { db } from "@/db";
import { dishes } from "@/db/schema";
import { DishSchema } from "@/schemas/dish-schema";
import { eq } from "drizzle-orm";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return Response.json(
        { error: "idが数値ではありません", id },
        { status: 400 }
      );
    }

    const body = await req.json();
    const result = DishSchema.safeParse(body);
    if (!result.success) {
      return Response.json(
        { error: "Invalid data", details: result.error, id },
        { status: 400 }
      );
    }

    const { name, timeMinutes, servings, isFavorite, imageUrl } = result.data;

    await db
      .update(dishes)
      .set({
        name,
        timeMinutes,
        servings,
        isFavorite,
        imageUrl,
      })
      .where(eq(dishes.id, id));

    return Response.json({ success: true, editedId: id });
  } catch (error) {
    console.error("POST /api/dishes/[id] error:", error);
    return Response.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}
