import { useListings } from "../../hooks/useListings";
import { ListingHeader } from "../../components/listingHeader";
import { ListingBody } from "../../components/listingBody";

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

      <ListingBody listing={data} />
    </div>
  );
}

export default Listing;
