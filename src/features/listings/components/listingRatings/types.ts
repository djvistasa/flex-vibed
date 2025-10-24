import type { IRating } from "@features/ratings/hooks/useRatings/types";

export type IListingRatingsProps = {
  listingId: number;
};

export type IListingRatingsState = {
  filteredRatings: IRating[];
  isLoading: boolean;
};
