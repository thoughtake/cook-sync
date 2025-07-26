import { fetcher } from "@/libs/fetcher";
import { Unit } from "@/types";
import useSWR, { mutate } from "swr";

const useUnits = () => {
  const { data } = useSWR<Unit[]>("api/units", fetcher, {
    suspense: true,
  });
  return {
    units: data ?? [],
    mutateUnits: () => mutate("api/Units"),
  };
};

export default useUnits;
