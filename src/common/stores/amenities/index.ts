import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IAmenity } from "@common/hooks/useAmenities/types";
import type { IAmenitiesStore } from "./types";

export const useAmenitiesStore = create<IAmenitiesStore>()(
  persist(
    (set, get) => ({
      amenities: [],

      setAmenities: (amenities: IAmenity[]) => {
        set({ amenities });
      },

      getAmenityById: (id: number) => {
        const { amenities } = get();
        return amenities.find((amenity) => amenity.id === id);
      },

      getAmenitiesByIds: (ids: number[]) => {
        const { amenities } = get();
        return amenities.filter((amenity) => ids.includes(amenity.id));
      },
    }),
    {
      name: "amenities-store",
      partialize: (state) => ({ amenities: state.amenities }),
    }
  )
);
