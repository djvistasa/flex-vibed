import { useFindGooglePlaceId } from "@common/hooks/useFindGooglePlaceId";
import { GoogleReviews } from "@common/components/googleReviews";
import {
  StyledAutoGoogleReviewsContainer,
  StyledLoadingMessage,
  StyledErrorMessage,
  StyledNoPlaceFound,
} from "./styles";
import type { IAutoGoogleReviewsProps } from "./types";

export function AutoGoogleReviews({
  lat,
  lng,
  radius = 100,
}: IAutoGoogleReviewsProps) {
  const {
    data: placeId,
    isLoading,
    isError,
    error,
  } = useFindGooglePlaceId(lat, lng, radius);

  if (isLoading) {
    return (
      <StyledAutoGoogleReviewsContainer>
        <StyledLoadingMessage>Finding Google place...</StyledLoadingMessage>
      </StyledAutoGoogleReviewsContainer>
    );
  }

  if (isError) {
    return (
      <StyledAutoGoogleReviewsContainer>
        <StyledErrorMessage>
          Error finding Google place: {error?.message || "Unknown error"}
        </StyledErrorMessage>
      </StyledAutoGoogleReviewsContainer>
    );
  }

  if (!placeId) {
    return (
      <StyledAutoGoogleReviewsContainer>
        <StyledNoPlaceFound>
          No Google place found for this location.
        </StyledNoPlaceFound>
      </StyledAutoGoogleReviewsContainer>
    );
  }

  return <GoogleReviews placeId={placeId} />;
}

export default AutoGoogleReviews;
