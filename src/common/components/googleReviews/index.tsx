import type { IGoogleReviewsProps } from "./types";
import { useGoogleReviews } from "@common/hooks/useGoogleReviews";
import { Stars } from "@common/components/stars";
import {
  StyledGoogleReviewsContainer,
  StyledHeader,
  StyledTitle,
  StyledCount,
  StyledReviewsList,
  StyledReviewItem,
  StyledReviewHeader,
  StyledAuthorInfo,
  StyledAuthorName,
  StyledAuthorPhoto,
  StyledRatingValue,
  StyledReviewText,
  StyledReviewDate,
  StyledNoReviews,
  StyledLoadingMessage,
  StyledErrorMessage,
} from "./styles";

export function GoogleReviews({ placeId }: IGoogleReviewsProps) {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useGoogleReviews(placeId);

  if (isLoading) {
    return (
      <StyledGoogleReviewsContainer>
        <StyledLoadingMessage>Loading Google reviews...</StyledLoadingMessage>
      </StyledGoogleReviewsContainer>
    );
  }

  if (isError) {
    return (
      <StyledGoogleReviewsContainer>
        <StyledErrorMessage>
          Error loading Google reviews: {error?.message || "Unknown error"}
        </StyledErrorMessage>
      </StyledGoogleReviewsContainer>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <StyledGoogleReviewsContainer>
        <StyledHeader>
          <StyledTitle>Google Reviews</StyledTitle>
          <StyledCount>0 reviews</StyledCount>
        </StyledHeader>
        <StyledNoReviews>
          No Google reviews available for this location.
        </StyledNoReviews>
      </StyledGoogleReviewsContainer>
    );
  }

  return (
    <StyledGoogleReviewsContainer>
      <StyledHeader>
        <StyledTitle>Google Reviews</StyledTitle>
        <StyledCount>
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
        </StyledCount>
      </StyledHeader>

      <StyledReviewsList>
        {reviews.map((review) => (
          <StyledReviewItem key={review.time}>
            <StyledReviewHeader>
              <StyledAuthorInfo>
                {review.profilePhotoUrl && (
                  <StyledAuthorPhoto
                    src={review.profilePhotoUrl}
                    alt={review.authorName}
                  />
                )}
                <StyledAuthorName>{review.authorName}</StyledAuthorName>
              </StyledAuthorInfo>
              <StyledRatingValue>
                <Stars rating={review.rating} />
              </StyledRatingValue>
            </StyledReviewHeader>

            {review.text && <StyledReviewText>{review.text}</StyledReviewText>}

            <StyledReviewDate>
              {review.relativeTimeDescription}
            </StyledReviewDate>
          </StyledReviewItem>
        ))}
      </StyledReviewsList>
    </StyledGoogleReviewsContainer>
  );
}

export default GoogleReviews;
