import type { StarsProps } from "./types";
import {
  StyledStarsContainer,
  StyledStarsDisplay,
  StyledNotRatedText,
  StyledRatingText,
} from "./styles";

export function Stars({ rating, maxRating = 5, showText = true }: StarsProps) {
  const renderStars = (ratingValue: number | null) => {
    if (ratingValue === null) {
      return <StyledNotRatedText>Not rated yet</StyledNotRatedText>;
    }

    const stars = [];
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half">⯨</span>);
    }

    const emptyStars = maxRating - Math.ceil(ratingValue);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`}>☆</span>);
    }

    return stars;
  };

  return (
    <StyledStarsContainer>
      <StyledStarsDisplay>{renderStars(rating)}</StyledStarsDisplay>
      {rating !== null && showText && (
        <StyledRatingText>
          ({rating}/{maxRating})
        </StyledRatingText>
      )}
    </StyledStarsContainer>
  );
}

export default Stars;
