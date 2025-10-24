import { Card } from "@common/components/card";
import { AboutProperty } from "../aboutProperty";
import { Amenities } from "../amenities";
import { StayPolicies } from "../stayPolicies";
import { BookYourStay } from "../bookYourStay";
import { ListingRatings } from "../listingRatings";
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
        <Card>
          <StayPolicies listing={listing} />
        </Card>
      </StyledLeftSection>

      <StyledRightSection>
        <Card hasPadding={false}>
          <BookYourStay />
        </Card>
        <ListingRatings listingId={listing.id} />
      </StyledRightSection>
    </StyledListingBodyContainer>
  );
}

export default ListingBody;
