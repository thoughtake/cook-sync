import z from "zod";

export const DishSchema = z.object({
  name: z.string().min(1),
  timeMinutes: z.number().int().nonnegative(),
  servings: z.number().int().nonnegative(),
  isFavorite: z.boolean(),
  imageUrl: z.string().max(1000).optional(),
});
