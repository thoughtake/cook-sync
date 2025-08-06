import { fetcher } from "@/libs/fetcher";
import { IngredientGroup } from "@/types";
import useSWR, { mutate } from "swr";

const useIngredientGroups = () => {
  const { data } = useSWR<IngredientGroup[]>("api/ingredient-groups", fetcher, {
    suspense: true,
    // fallbackData: [],
  });
  return {
    ingredientGroups: data ?? [],
    mutateIngredientGroups: () => mutate("api/ingredientGroups"),
  };
};

export default useIngredientGroups;
