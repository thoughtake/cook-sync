import { fetcher } from "@/libs/fetcher";
import { Ingredient } from "@/types";
import useSWR from "swr";

const useIngredients = () => {
  const { data, mutate } = useSWR<Ingredient[]>("api/ingredients", fetcher, {
    suspense: true,
    fallbackData: [],
  });
  return {
    ingredients: data ?? [],
    mutateIngredients: mutate,
  };
};

export default useIngredients;
