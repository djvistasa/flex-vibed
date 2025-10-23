import { useQuery } from "@tanstack/react-query";
import type { IRating, IUseRatingsReturnTypes } from "./types";
import { RATINGS } from "./constants";
import { useRatingStore } from "../../store";

export function useRatings(): IUseRatingsReturnTypes {
  const setRatings = useRatingStore((state) => state.setRatings);

  const { isLoading, isError, error, refetch } = useQuery({
    queryKey: ["ratings"],
    queryFn: async (): Promise<IRating[]> => {
      // Simulate API call with mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          const data = RATINGS;
          setRatings(data);
          resolve(data);
        }, 500);
      });
    },
  });

  return {
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
}

export default useRatings;
