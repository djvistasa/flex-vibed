export type IReviewCategory = {
  category: string;
  rating: number;
};

export type IRating = {
  id: number;
  accountId: number;
  listingMapId: number;
  reservationId: number;
  autoReviewId: number | null;
  timeDelta: number | null;
  scheduledDateTime: string | null;
  channelId: number;
  type: string;
  status: string;
  rating: number | null;
  externalReviewId: string | null;
  externalReservationId: string | null;
  publicReview: string | null;
  privateFeedback: string | null;
  revieweeResponse: string | null;
  isRevieweeRecommended: number | null;
  isCancelled: number;
  autoReviewTemplateId: number | null;
  reviewCategory: IReviewCategory[];
  departureDate: string;
  arrivalDate: string;
  listingName: string;
  guestName: string;
};

export type IUseRatingsReturnTypes = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};
