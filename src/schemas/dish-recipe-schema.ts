import z from "zod";

export const DishRecipeBaseSchema = z.object({
  stepNumber: z.number().int().nonnegative(),
  description: z.string().max(1000),
});

//POST用：dishIdを含まない
export const DishRecipeCreateSchema = DishRecipeBaseSchema;

//PUT用：dishIdを含む
export const DishRecipeUpdateSchema = DishRecipeBaseSchema.extend({
  dishId: z.number().int().nonnegative(),
});
