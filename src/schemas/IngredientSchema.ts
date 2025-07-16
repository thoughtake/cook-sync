import z from "zod";

export const IngredientSchema = z.object({
  name: z.string().min(1),
  ingredientGroupId: z.number(),
  unitId: z.number(),
  pricePerUnit: z.number().optional(),
});
