import { fetcher } from "@/libs/fetcher"
import { Ingredient } from "@/types"
import useSWR, { mutate } from "swr"

const useIngredients = () => {
  const { data } = useSWR<Ingredient[]>("api/ingredients", fetcher, {
    suspense: true,
  });
  return {
    ingredients: data ?? [],
    mutateIngredients: () => mutate("api/ingredients"),
  };
}

export default useIngredients;