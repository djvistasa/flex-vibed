import { Card } from "@common/components/card";
import { AboutProperty } from "../aboutProperty";
import { Amenities } from "../amenities";
import { BookYourStay } from "../bookYourStay";
import {
  StyledListingBodyContainer,
  StyledLeftSection,
  StyledRightSection,
} from "./styles";
import type { IListingBodyProps } from "./types";

export function ListingBody({ listing }: IListingBodyProps) {
  return (
    <StyledListingBodyContainer>
      <StyledLeftSection>
        <Card>
          <AboutProperty description={listing.description} />
        </Card>
        <Card>
          <Amenities
            amenityIds={listing.listingAmenities.map(
              (amenity) => amenity.amenityId
            )}
          />
        </Card>
      </StyledLeftSection>

      <StyledRightSection>
        <BookYourStay />
      </StyledRightSection>
    </StyledListingBodyContainer>
  );
}

export default ListingBody;
