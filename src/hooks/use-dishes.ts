import { fetcher } from "@/libs/fetcher";
import { Dish } from "@/types";
import useSWR from "swr";

const useDishes = () => {
  const { data, mutate } = useSWR<Dish[]>("api/dishes", fetcher, {
    suspense: true,
    fallbackData: [],
  });
  return {
    dishes: data ?? [],
    mutateDishes: mutate,
  };
};

export default useDishes;
