import z from "zod";

export const IngredientSchema = z.object({
  name: z.string().min(1),
  ingredientGroupId: z.number().int().nonnegative(),
  unitId: z.number().int().nonnegative(),
  pricePerUnit: z.number().int().nonnegative(),
});
