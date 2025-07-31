import z from "zod";

export const DishRecipeSchema = z.object({
  id: z.number().int().nonnegative().optional(),
  dishId: z.number().int().nonnegative(),
  stepNumber: z.number().int().nonnegative(),
  description: z.string().max(1000),
});
