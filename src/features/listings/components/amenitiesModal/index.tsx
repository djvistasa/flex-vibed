import {
  StyledAmenitiesModalContainer,
  StyledAmenitiesModalGrid,
  StyledAmenityModalItem,
  StyledAmenityModalIcon,
  StyledAmenityModalText,
} from "./styles";
import { getAmenityIcon } from "../amenities/utils";
import type { IAmenitiesModalProps } from "./types";

export function AmenitiesModal({ amenities }: IAmenitiesModalProps) {
  return (
    <StyledAmenitiesModalContainer>
      <StyledAmenitiesModalGrid>
        {amenities.map((amenity) => (
          <StyledAmenityModalItem key={amenity.id}>
            <StyledAmenityModalIcon>
              {getAmenityIcon(amenity.name)}
            </StyledAmenityModalIcon>
            <StyledAmenityModalText>{amenity.name}</StyledAmenityModalText>
          </StyledAmenityModalItem>
        ))}
      </StyledAmenitiesModalGrid>
    </StyledAmenitiesModalContainer>
  );
}

export default AmenitiesModal;
