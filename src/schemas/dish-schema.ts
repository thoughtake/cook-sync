import z from "zod";

export const DishSchema = z.object({
  name: z.string().min(1),
  timeMinutes: z.number(),
  servings: z.number(),
  isFavorite: z.boolean(),
  imageUrl: z.string().optional(),
});
