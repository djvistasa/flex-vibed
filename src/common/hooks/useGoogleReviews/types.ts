export type IGoogleReview = {
  authorName: string;
  authorUrl?: string;
  profilePhotoUrl?: string;
  rating: number;
  relativeTimeDescription: string;
  text: string;
  time: number;
};

export type IGooglePlacesResponse = {
  result: {
    reviews: IGoogleReview[];
    place_id: string;
  };
  status: string;
};

export type IGoogleNearbySearchResponse = {
  results: Array<{
    place_id: string;
    name: string;
    vicinity: string;
    rating?: number;
    user_ratings_total?: number;
  }>;
  status: string;
};

export type IUseGoogleReviewsReturnTypes = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  data: IGoogleReview[] | undefined;
  refetch: () => void;
};
