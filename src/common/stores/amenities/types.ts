import type { IAmenity } from "@/common/hooks/useAmenities/types";

export type IAmenitiesStore = {
  amenities: IAmenity[];
  setAmenities: (amenities: IAmenity[]) => void;
  getAmenityById: (id: number) => IAmenity | undefined;
  getAmenitiesByIds: (ids: number[]) => IAmenity[];
};
