import {
  StyledAmenitiesContainer,
  StyledAmenitiesHeader,
  StyledTitle,
  StyledViewAllButton,
  StyledAmenitiesGrid,
  StyledAmenityItem,
  StyledAmenityIcon,
  StyledAmenityText,
  StyledLoadingMessage,
} from "./styles";
import { useAmenitiesStore } from "@common/stores/amenities";
import { useAmenities } from "@common/hooks/useAmenities";
import { useUIStore } from "@common/stores/ui";
import { getAmenityIcon } from "./utils";
import { AmenitiesModal } from "../amenitiesModal";
import type { IAmenitiesProps } from "./types";

export function Amenities({ amenityIds }: IAmenitiesProps) {
  const { isLoading, isError, error } = useAmenities();
  const getAmenitiesByIds = useAmenitiesStore(
    (state) => state.getAmenitiesByIds
  );
  const showModal = useUIStore((state) => state.showModal);
  const hideModal = useUIStore((state) => state.hideModal);

  // Get amenities from store using the listing's amenity IDs
  const amenities = getAmenitiesByIds(amenityIds);

  // Show first 9 amenities for the grid
  const displayedAmenities = amenities.slice(0, 9);

  const handleViewAllAmenities = (): void => {
    showModal({
      title: "All Amenities",
      children: <AmenitiesModal amenities={amenities} />,
      showFooter: true,
      confirmText: "Close",
      onConfirm: hideModal,
    });
  };

  if (isLoading) {
    return (
      <StyledAmenitiesContainer>
        <StyledAmenitiesHeader>
          <StyledTitle>Amenities</StyledTitle>
        </StyledAmenitiesHeader>
        <StyledLoadingMessage>Loading amenities...</StyledLoadingMessage>
      </StyledAmenitiesContainer>
    );
  }

  if (isError) {
    return (
      <StyledAmenitiesContainer>
        <StyledAmenitiesHeader>
          <StyledTitle>Amenities</StyledTitle>
        </StyledAmenitiesHeader>
        <StyledLoadingMessage>
          Failed to load amenities: {error?.message || "Unknown error"}
        </StyledLoadingMessage>
      </StyledAmenitiesContainer>
    );
  }

  if (amenities.length === 0) {
    return (
      <StyledAmenitiesContainer>
        <StyledAmenitiesHeader>
          <StyledTitle>Amenities</StyledTitle>
        </StyledAmenitiesHeader>
        <StyledLoadingMessage>No amenities available</StyledLoadingMessage>
      </StyledAmenitiesContainer>
    );
  }

  return (
    <StyledAmenitiesContainer>
      <StyledAmenitiesHeader>
        <StyledTitle>Amenities</StyledTitle>
        <StyledViewAllButton onClick={handleViewAllAmenities}>
          View all amenities →
        </StyledViewAllButton>
      </StyledAmenitiesHeader>

      <StyledAmenitiesGrid>
        {displayedAmenities.map((amenity) => (
          <StyledAmenityItem key={amenity.id}>
            <StyledAmenityIcon>
              {getAmenityIcon(amenity.name)}
            </StyledAmenityIcon>
            <StyledAmenityText>{amenity.name}</StyledAmenityText>
          </StyledAmenityItem>
        ))}
      </StyledAmenitiesGrid>
    </StyledAmenitiesContainer>
  );
}
