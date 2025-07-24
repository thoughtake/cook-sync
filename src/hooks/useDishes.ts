import { fetcher } from "@/libs/fetcher"
import { Dishes } from "@/types"
import useSWR from "swr"

const useDishes = () => {
  const {data, mutate} = useSWR<Dishes[]>("api/dishes", fetcher, {
    suspense: true,
  });
  return {
    dishes: data ?? [],
    mutateDishes: mutate,
  };
}

export default useDishes;