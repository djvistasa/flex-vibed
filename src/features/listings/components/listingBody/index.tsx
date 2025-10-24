import { Card } from "@common/components/card";
import { AboutProperty } from "../aboutProperty";
import { Amenities } from "../amenities";
import { StayPolicies } from "../stayPolicies";
import { BookYourStay } from "../bookYourStay";
import { ListingRatings } from "../listingRatings";
import { GoogleReviews } from "@common/components/googleReviews";
import { AutoGoogleReviews } from "@common/components/autoGoogleReviews";
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

        {listing.googlePlaceId ? (
          <Card>
            <GoogleReviews placeId={listing.googlePlaceId} />
          </Card>
        ) : (
          <Card>
            <AutoGoogleReviews lat={listing.lat} lng={listing.lng} />
          </Card>
        )}
      </StyledRightSection>
    </StyledListingBodyContainer>
  );
}

export default ListingBody;
