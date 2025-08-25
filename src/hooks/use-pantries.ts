import { fetcher } from "@/libs/fetcher"
import { Pantry } from "@/types"
import useSWR from "swr"

const usePantries = () => {
  const { data, mutate } = useSWR<Pantry[]>("api/pantries", fetcher, {
    suspense: true,
  });
  return {
    pantries: data ?? [],
    mutatePantries: mutate,
  };
};

export default usePantries;