import { dishRecipes } from "@/db/schema";
import { deleteHandler } from "../../delete-handler";

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;

  return await deleteHandler({
    table: dishRecipes,
    column: dishRecipes.dishId,
    id: id,
  });
};
