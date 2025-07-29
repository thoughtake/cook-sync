import { fetcher } from "@/libs/fetcher";
import { DishRecipe } from "@/types";
import useSWR from "swr";

const useDishRecipes = () => {
  const { data, mutate } = useSWR<DishRecipe[]>("api/dish-recipes", fetcher, {
    suspense: true,
    // fallbackData: [],
  });
  return {
    dishRecipes: data ?? [],
    mutateDishes: mutate,
  };
};

export default useDishRecipes;
