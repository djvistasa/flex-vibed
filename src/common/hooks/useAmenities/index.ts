import { useQuery } from "@tanstack/react-query";
import { makeApiRequest } from "@common/utils";
import { useAmenitiesStore } from "@common/stores/amenities";
import type { IAmenitiesApiResponse } from "./types";

export function useAmenities() {
  const setAmenities = useAmenitiesStore((state) => state.setAmenities);

  return useQuery({
    queryKey: ["amenities"],
    queryFn: async (): Promise<IAmenitiesApiResponse> => {
      const response = await makeApiRequest("/amenities");

      if (!response.ok) {
        throw new Error(
          typeof response.error === "string"
            ? response.error
            : "Failed to fetch amenities"
        );
      }

      const data = response.result as IAmenitiesApiResponse;

      // Store amenities in the global store
      setAmenities(data.result);

      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

export default useAmenities;
