import { useMemo } from "react";
import { useRatingStore } from "@features/ratings/store";
import { Stars } from "@common/components/stars";
import { Card } from "@common/components/card";
import {
  StyledListingRatingsContainer,
  StyledRatingsHeader,
  StyledRatingsTitle,
  StyledRatingsCount,
  StyledRatingsList,
  StyledRatingItem,
  StyledRatingHeader,
  StyledGuestName,
  StyledRatingValue,
  StyledReviewText,
  StyledReviewDate,
  StyledNoRatings,
  StyledLoadingMessage,
} from "./styles";
import type { IListingRatingsProps } from "./types";
import {
  filterRatingsByListing,
  getTopRatings,
  formatReviewDate,
  truncateText,
} from "./utils";

export function ListingRatings({ listingId }: IListingRatingsProps) {
  const { ratings } = useRatingStore();

  const listingRatings = useMemo(() => {
    // Filter ratings by listingMapId and published status
    const filteredRatings = filterRatingsByListing(
      ratings,
      listingId,
      "published"
    );

    // Get top 10 ratings sorted by rating value
    return getTopRatings(filteredRatings, 10);
  }, [ratings, listingId]);

  if (ratings.length === 0) {
    return (
      <Card>
        <StyledListingRatingsContainer>
          <StyledLoadingMessage>Loading ratings...</StyledLoadingMessage>
        </StyledListingRatingsContainer>
      </Card>
    );
  }

  if (listingRatings.length === 0) {
    return (
      <Card>
        <StyledListingRatingsContainer>
          <StyledRatingsHeader>
            <StyledRatingsTitle>Guest Reviews</StyledRatingsTitle>
            <StyledRatingsCount>0 reviews</StyledRatingsCount>
          </StyledRatingsHeader>
          <StyledNoRatings>
            No published reviews yet for this listing.
          </StyledNoRatings>
        </StyledListingRatingsContainer>
      </Card>
    );
  }

  return (
    <Card>
      <StyledListingRatingsContainer>
        <StyledRatingsHeader>
          <StyledRatingsTitle>Guest Reviews</StyledRatingsTitle>
          <StyledRatingsCount>
            {listingRatings.length}{" "}
            {listingRatings.length === 1 ? "review" : "reviews"}
          </StyledRatingsCount>
        </StyledRatingsHeader>

        <StyledRatingsList>
          {listingRatings.map((rating) => (
            <StyledRatingItem key={rating.id}>
              <StyledRatingHeader>
                <StyledGuestName>{rating.guestName}</StyledGuestName>
                <StyledRatingValue>
                  {rating.rating !== null ? (
                    <>
                      <Stars rating={rating.rating} />
                    </>
                  ) : (
                    "No rating"
                  )}
                </StyledRatingValue>
              </StyledRatingHeader>

              {rating.publicReview && (
                <StyledReviewText>
                  {truncateText(rating.publicReview)}
                </StyledReviewText>
              )}

              <StyledReviewDate>
                {formatReviewDate(rating.departureDate)}
              </StyledReviewDate>
            </StyledRatingItem>
          ))}
        </StyledRatingsList>
      </StyledListingRatingsContainer>
    </Card>
  );
}

export default ListingRatings;
