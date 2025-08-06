import z from "zod";

export const DishIngredientBaseSchema = z.object({
  ingredientId: z.number().int().nonnegative(),
  quantity: z.string().refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
      message: "quantity は少数第2位までの数値文字列で入力してください",
    }),
});

//POST用：dishIdを含まない
export const DishIngredientCreateSchema = DishIngredientBaseSchema;

//PUT用：dishIdを含む
export const DishIngredientUpdateSchema = DishIngredientBaseSchema.extend({
  dishId: z.number().int().nonnegative(),
})