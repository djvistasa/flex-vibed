import type { IListingHeaderProps } from "./types";
import { PhotoIcon } from "@/assets/svg/photoIcon";
import { GuestsIcon } from "@/assets/svg/guestsIcon";
import { BedroomsIcon } from "@/assets/svg/bedroomsIcon";
import { BathroomsIcon } from "@/assets/svg/bathroomsIcon";
import { BedsIcon } from "@/assets/svg/bedsIcon";
import {
  StyledListingHeaderContainer,
  StyledImageGrid,
  StyledMainImage,
  StyledImage,
  StyledSmallImage,
  StyledViewAllButton,
  StyledPropertyTitle,
  StyledPropertyDetails,
  StyledDetailItem,
  StyledDetailValue,
  StyledDetailLabel,
} from "./styles";

export function ListingHeader({
  images,
  propertyName,
  personCapacity,
  bedroomsNumber,
  bathroomsNumber,
  bedsNumber,
}: IListingHeaderProps) {
  if (!images || images.length === 0) {
    return null;
  }

  const sortedImages = [...images].sort((a, b) => a.sortOrder - b.sortOrder);
  const displayImages = sortedImages.slice(0, 5);

  const handleViewAllPhotos = (): void => {
    // TODO: Implement photo gallery modal
  };

  return (
    <StyledListingHeaderContainer>
      <StyledImageGrid>
        {displayImages[0] && (
          <StyledMainImage>
            <StyledImage
              src={displayImages[0].url}
              alt={displayImages[0].caption || propertyName}
            />
          </StyledMainImage>
        )}

        {displayImages[1] && (
          <StyledSmallImage>
            <StyledImage
              src={displayImages[1].url}
              alt={displayImages[1].caption || propertyName}
            />
          </StyledSmallImage>
        )}

        {displayImages[2] && (
          <StyledSmallImage>
            <StyledImage
              src={displayImages[2].url}
              alt={displayImages[2].caption || propertyName}
            />
          </StyledSmallImage>
        )}

        {displayImages[3] && (
          <StyledSmallImage>
            <StyledImage
              src={displayImages[3].url}
              alt={displayImages[3].caption || propertyName}
            />
          </StyledSmallImage>
        )}

        {displayImages[4] && (
          <StyledSmallImage>
            <StyledImage
              src={displayImages[4].url}
              alt={displayImages[4].caption || propertyName}
            />
            {images.length > 5 && (
              <StyledViewAllButton onClick={handleViewAllPhotos}>
                <PhotoIcon />
                View all photos
              </StyledViewAllButton>
            )}
          </StyledSmallImage>
        )}
      </StyledImageGrid>

      <StyledPropertyTitle>{propertyName}</StyledPropertyTitle>

      <StyledPropertyDetails>
        <StyledDetailItem>
          <GuestsIcon />
          <StyledDetailValue>{personCapacity}</StyledDetailValue>
          <StyledDetailLabel>Guests</StyledDetailLabel>
        </StyledDetailItem>

        <StyledDetailItem>
          <BedroomsIcon />
          <StyledDetailValue>{bedroomsNumber}</StyledDetailValue>
          <StyledDetailLabel>Bedrooms</StyledDetailLabel>
        </StyledDetailItem>

        <StyledDetailItem>
          <BathroomsIcon />
          <StyledDetailValue>{bathroomsNumber}</StyledDetailValue>
          <StyledDetailLabel>Bathrooms</StyledDetailLabel>
        </StyledDetailItem>

        <StyledDetailItem>
          <BedsIcon />
          <StyledDetailValue>{bedsNumber}</StyledDetailValue>
          <StyledDetailLabel>beds</StyledDetailLabel>
        </StyledDetailItem>
      </StyledPropertyDetails>
    </StyledListingHeaderContainer>
  );
}

export default ListingHeader;
