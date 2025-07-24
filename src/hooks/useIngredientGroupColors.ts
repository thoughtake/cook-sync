import { fetcher } from "@/libs/fetcher";
import { ingredientGroupColor } from "@/types";
import useSWR, { mutate } from "swr";

const useIngredientGroupColors = () => {
  const { data } = useSWR<ingredientGroupColor[]>(
    "api/ingredient-group-colors",
    fetcher,
    {
      suspense: true,
    }
  );
  return {
    ingredientGroupColors: data ?? [],
    mutateIngredientGroupColors: () => mutate("api/ingredientGroupColors"),
  };
};

export default useIngredientGroupColors;
