import { db } from "@/db";
import { dishes, dishIngredients, dishRecipes } from "@/db/schema";
import { DishSchema } from "@/schemas/dish-schema";
import { eq } from "drizzle-orm";
import { deleteHandler } from "../../delete-handler";
import z from "zod";
import { DishIngredientSchema } from "@/schemas/dish-ingredient-schema";
import { DishRecipeSchema } from "@/schemas/dish-recipe-schema";

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;

  return await deleteHandler({
    table: dishes,
    column: dishes.id,
    id: id,
  });
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const dishId = Number((await params).id);
    if (isNaN(dishId)) {
      return Response.json(
        { error: "dishIdが数値ではありません", dishId },
        { status: 400 }
      );
    }
    
    const { dish, ingredients, recipes } = await req.json();
    const parsedDish = DishSchema.safeParse(dish);
    const parsedDishIngredients = z
    .array(DishIngredientSchema)
    .safeParse(ingredients);
    const parsedDishRecipes = z.array(DishRecipeSchema).safeParse(recipes);
    
    if (!parsedDish.success || !parsedDishIngredients.success || !parsedDishRecipes.success) {
      // console.log(parsedDish.error)
      // console.log(parsedDishIngredients.error)
      // console.log(parsedDishRecipes.error)
      return Response.json(
        {
          error: "Invalid data",
          details: {
            dish: !parsedDish.success ? parsedDish.error : null,
            dishIngredients: !parsedDishIngredients.success
            ? parsedDishIngredients.error
            : null,
            dishRecipes: !parsedDishRecipes.success
            ? parsedDishRecipes.error
            : null,
          },
        },
        { status: 400 }
      );
    }
    // console.log(parsedDishIngredients.data)

    await db.transaction(async (tx) => {
      //料理の更新
      await tx.update(dishes).set(parsedDish.data).where(eq(dishes.id, dishId));

      //材料の更新
      await tx
        .delete(dishIngredients)
        .where(eq(dishIngredients.dishId, dishId));
      await tx.insert(dishIngredients).values(parsedDishIngredients.data);

      //手順の更新
      await tx.delete(dishRecipes).where(eq(dishRecipes.dishId, dishId));
      await tx.insert(dishRecipes).values(parsedDishRecipes.data);
    });

    return Response.json({ success: true, editedId: dishId });
  } catch (error) {
    console.error("POST /api/dishes/[id] error:", error);
    return Response.json({ error: "更新に失敗しました" }, { status: 500 });
  }
};
