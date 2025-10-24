import type { IGoogleReview } from "@common/hooks/useGoogleReviews/types";

export type IGoogleReviewsStore = {
  reviews: Record<string, IGoogleReview[]>;
  setReviews: (placeId: string, reviews: IGoogleReview[]) => void;
  getReviews: (placeId: string) => IGoogleReview[];
  clearReviews: () => void;
};
