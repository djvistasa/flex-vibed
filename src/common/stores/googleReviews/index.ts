import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IGoogleReview } from "@common/hooks/useGoogleReviews/types";
import type { IGoogleReviewsStore } from "./types";

export const useGoogleReviewsStore = create<IGoogleReviewsStore>()(
  persist(
    (set, get) => ({
      reviews: {},
      setReviews: (placeId: string, reviews: IGoogleReview[]) =>
        set((state) => ({
          reviews: { ...state.reviews, [placeId]: reviews },
        })),
      getReviews: (placeId: string) => {
        const state = get();
        return state.reviews[placeId] || [];
      },
      clearReviews: () => set({ reviews: {} }),
    }),
    {
      name: "google-reviews-storage",
    }
  )
);
