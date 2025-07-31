import { fetcher } from "@/libs/fetcher";
import { DishIngredient } from "@/types";
import useSWR from "swr";

const useDishIngredients = () => {
  const { data, mutate } = useSWR<DishIngredient[]>(
    "api/dish-ingredients",
    fetcher,
    {
      suspense: true,
      // // fallbackData: [],
    }
  );
  return {
    dishIngredients: data ?? [],
    mutateDishIngredients: mutate,
  };
};

export default useDishIngredients;
