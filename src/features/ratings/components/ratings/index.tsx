import {
  StyledRatingsContainer,
  StyledLoadingState,
  StyledErrorState,
  StyledEmptyState,
} from "./styles";
import { useRatings } from "../../hooks/useRatings";
import { useRatingStore } from "../../store";
import { Rating } from "../rating";

export function Ratings() {
  const { isLoading, isError, error } = useRatings();
  const filteredRatings = useRatingStore((state) => state.filteredRatings);
  const ratings = useRatingStore((state) => state.ratings);

  if (isLoading) {
    return <StyledLoadingState>Loading ratings...</StyledLoadingState>;
  }

  if (isError) {
    return (
      <StyledErrorState>
        Error loading ratings: {error?.message || "Unknown error"}
      </StyledErrorState>
    );
  }

  // Check if we have any ratings at all (source of truth)
  if (ratings.length === 0) {
    return <StyledEmptyState>No ratings found</StyledEmptyState>;
  }

  // Check if filters have excluded all ratings
  if (filteredRatings.length === 0) {
    return (
      <StyledEmptyState>No ratings match the current filters</StyledEmptyState>
    );
  }

  return (
    <StyledRatingsContainer>
      {filteredRatings.map((rating) => (
        <Rating key={rating.id} rating={rating} />
      ))}
    </StyledRatingsContainer>
  );
}

export default Ratings;
