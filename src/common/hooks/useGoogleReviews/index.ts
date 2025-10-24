import { useQuery } from "@tanstack/react-query";
import { fetchGoogleReviews } from "./utils";
import type { IUseGoogleReviewsReturnTypes } from "./types";

export function useGoogleReviews(
  placeId: string
): IUseGoogleReviewsReturnTypes {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["googleReviews", placeId],
    queryFn: () => fetchGoogleReviews(placeId),
    enabled: !!placeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  return {
    isLoading,
    isError,
    error: error as Error | null,
    data,
    refetch,
  };
}
