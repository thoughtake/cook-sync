import z from "zod";

export const DishIngredientSchema = z.object({
  id: z.number().int().nonnegative().optional(),
  dishId: z.number().int().nonnegative(),
  ingredientId: z.number().int().nonnegative(),
  quantity: z.string().refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
      message: "quantity は少数第2位までの数値文字列で入力してください",
    }),
});
