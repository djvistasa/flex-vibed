import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { IRatingProps } from "./types";
import { Stars } from "@common/components/stars";
import { StatusSelector } from "@common/components/statusSelector";
import { useRatingStore } from "../../store";
import { useUIStore } from "@common/stores/ui";
import type { IRatingStatus } from "../../store/types";
import {
  StyledRatingContainer,
  StyledListingName,
  StyledReviewStatus,
  StyledStatusBadge,
  StyledRatingValue,
  StyledReviewCategories,
  StyledCategoriesTitle,
  StyledCategoryItem,
  StyledCategoryName,
  StyledCategoryRating,
  StyledCategoryBar,
  StyledCategoryBarFill,
  StyledCategoryScore,
  StyledViewListingButton,
  StyledRatingHeader,
} from "./styles";

export function Rating({ rating }: IRatingProps) {
  const navigate = useNavigate();
  const selectedStatusRef = useRef<IRatingStatus>(
    rating.status as IRatingStatus
  );
  const updateRatingStatus = useRatingStore(
    (state) => state.updateRatingStatus
  );
  const showModal = useUIStore((state) => state.showModal);
  const hideModal = useUIStore((state) => state.hideModal);

  const formatCategoryName = (category: string): string => {
    return category.replace(/_/g, " ");
  };

  const handleStatusSelect = (status: IRatingStatus): void => {
    selectedStatusRef.current = status;
  };

  const handlePublish = (): void => {
    updateRatingStatus(rating.id, selectedStatusRef.current);
    hideModal();
  };

  const handleCancel = (): void => {
    hideModal();
  };

  const handleStatusClick = (): void => {
    selectedStatusRef.current = rating.status as IRatingStatus;
    showModal({
      title: "Change Status",
      confirmText: "Publish",
      cancelText: "Cancel",
      onConfirm: handlePublish,
      onCancel: handleCancel,
      onClose: handleCancel,
      children: (
        <StatusSelector
          currentStatus={rating.status as IRatingStatus}
          onStatusSelect={handleStatusSelect}
        />
      ),
    });
  };

  const handleViewListing = (): void => {
    navigate(`/listing/${rating.listingMapId}`);
  };

  return (
    <StyledRatingContainer>
      <StyledRatingHeader>
        <StyledListingName>{rating.listingName}</StyledListingName>
        <StyledViewListingButton onClick={handleViewListing}>
          View Listing
        </StyledViewListingButton>
      </StyledRatingHeader>

      <StyledReviewStatus>
        <span>Status:</span>
        <StyledStatusBadge status={rating.status} onClick={handleStatusClick}>
          {rating.status.charAt(0).toUpperCase() + rating.status.slice(1)}
        </StyledStatusBadge>
      </StyledReviewStatus>
      <StyledRatingValue>
        <span>Rating:</span>
        <Stars rating={rating.rating} maxRating={5} showText={true} />
      </StyledRatingValue>

      {rating.reviewCategory && rating.reviewCategory.length > 0 && (
        <StyledReviewCategories>
          <StyledCategoriesTitle>Review Categories</StyledCategoriesTitle>
          {rating.reviewCategory.map((category, index) => (
            <StyledCategoryItem key={index}>
              <StyledCategoryName>
                {formatCategoryName(category.category)}
              </StyledCategoryName>
              <StyledCategoryRating>
                <StyledCategoryBar>
                  <StyledCategoryBarFill
                    percentage={(category.rating / 10) * 100}
                  />
                </StyledCategoryBar>
                <StyledCategoryScore>{category.rating}/10</StyledCategoryScore>
              </StyledCategoryRating>
            </StyledCategoryItem>
          ))}
        </StyledReviewCategories>
      )}
    </StyledRatingContainer>
  );
}

export default Rating;
