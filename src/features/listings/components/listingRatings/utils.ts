import type { IRating } from "@features/ratings/hooks/useRatings/types";

// Helper function to filter ratings by listingMapId and status
export const filterRatingsByListing = (
  ratings: IRating[],
  listingMapId: number,
  status: string = "published"
): IRating[] => {
  return ratings.filter(
    (rating) => rating.listingMapId === listingMapId && rating.status === status
  );
};

// Helper function to get top N ratings sorted by rating value (descending)
export const getTopRatings = (
  ratings: IRating[],
  limit: number = 10
): IRating[] => {
  return ratings
    .filter((rating) => rating.rating !== null)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
};

// Helper function to format date for display
export const formatReviewDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

// Helper function to truncate text
export const truncateText = (text: string, maxLength: number = 150): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};
