import { db } from "@/db";
import { dishes, dishIngredients, dishRecipes } from "@/db/schema";
import { DishIngredientCreateSchema } from "@/schemas/dish-ingredient-schema";
import { DishRecipeCreateSchema } from "@/schemas/dish-recipe-schema";
import { DishSchema } from "@/schemas/dish-schema";
import z from "zod";

export const GET = async () => {
  try {
    const result = await db.select().from(dishes);

    return Response.json(result);
  } catch (err) {
    console.error("GET /api/dishes error:", err);
    return Response.json(
      { error: "データの取得に失敗しました" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const { dish, ingredients, recipes } = await req.json();
    const parsedDish = DishSchema.safeParse(dish);
    const parsedDishIngredients = z
      .array(DishIngredientCreateSchema)
      .safeParse(ingredients);
    const parsedDishRecipes = z
      .array(DishRecipeCreateSchema)
      .safeParse(recipes);

    if (
      !parsedDish.success ||
      !parsedDishIngredients.success ||
      !parsedDishRecipes.success
    ) {
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

    await db.transaction(async (tx) => {
      //料理の登録
      const [result] = await tx
        .insert(dishes)
        .values(parsedDish.data)
        .$returningId();
      //登録した料理のIDを取得
      const newDishId = result.id;

      //IDを反映した材料
      const ingredientsWithDishId = parsedDishIngredients.data.map((ing) => ({
        ...ing,
        dishId: newDishId,
      }));

      //IDを反映した手順
      const recipesWithDishId = parsedDishRecipes.data.map((rec) => ({
        ...rec,
        dishId: newDishId,
      }));

      await tx.insert(dishIngredients).values(ingredientsWithDishId);
      await tx.insert(dishRecipes).values(recipesWithDishId);
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("POST /api/dishes error:", error);
    return Response.json({ error: "登録に失敗しました" }, { status: 500 });
  }
};
