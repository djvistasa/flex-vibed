import { useQuery } from "@tanstack/react-query";
import { findGooglePlaceId } from "../useGoogleReviews/utils";

export type IUseFindGooglePlaceIdReturnTypes = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: string | null | undefined;
  refetch: () => void;
};

export function useFindGooglePlaceId(
  lat: number | null,
  lng: number | null,
  radius: number = 100
): IUseFindGooglePlaceIdReturnTypes {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["findGooglePlaceId", lat, lng, radius],
    queryFn: () => findGooglePlaceId(lat!, lng!, radius),
    enabled: !!lat && !!lng,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - place IDs don't change often
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
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
