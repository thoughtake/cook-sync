import { fetcher } from "@/libs/fetcher";
import { IngredientGroupColor } from "@/types";
import useSWR, { mutate } from "swr";

const useIngredientGroupColors = () => {
  const { data } = useSWR<IngredientGroupColor[]>(
    "api/ingredient-group-colors",
    fetcher,
    {
      suspense: true,
      // fallbackData: [],
    }
  );
  return {
    ingredientGroupColors: data ?? [],
    mutateIngredientGroupColors: () => mutate("api/ingredientGroupColors"),
  };
};

export default useIngredientGroupColors;
