import { useListings } from "../../hooks/useListings";
import { ListingHeader } from "../../components/listingHeader";

function Listing() {
  const { isLoading, isError, data } = useListings();

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
        <p>Please wait while we fetch the listing details.</p>
      </div>
    );
  }

  if (isError) {
    return null;
  }

  if (!data) {
    return (
      <div>
        <h1>Not Found</h1>
        <p>The requested listing was not found.</p>
      </div>
    );
  }

  return (
    <div>
      <ListingHeader
        images={data.listingImages}
        propertyName={data.name}
        personCapacity={data.personCapacity}
        bedroomsNumber={data.bedroomsNumber}
        bathroomsNumber={data.bathroomsNumber}
        bedsNumber={data.bedsNumber}
      />

      <p>
        <strong>Location:</strong> {data.city}, {data.state}, {data.country}
      </p>
      <p>
        <strong>Address:</strong> {data.publicAddress}
      </p>
      <p>
        <strong>Description:</strong> {data.description}
      </p>
      <p>
        <strong>Price:</strong> ${data.price}/night
      </p>
      <p>
        <strong>Bedrooms:</strong> {data.bedroomsNumber} |{" "}
        <strong>Bathrooms:</strong> {data.bathroomsNumber} |{" "}
        <strong>Guests:</strong> {data.personCapacity}
      </p>
      <p>
        <strong>Rating:</strong> {data.averageReviewRating}/10 (
        {data.starRating} stars)
      </p>
    </div>
  );
}

export default Listing;
