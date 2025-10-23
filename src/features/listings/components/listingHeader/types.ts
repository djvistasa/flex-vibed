import type { IListingImage } from "../../hooks/useListings/types";

export type IListingHeaderProps = {
  images: IListingImage[];
  propertyName: string;
  personCapacity: number;
  bedroomsNumber: number;
  bathroomsNumber: number;
  bedsNumber: number;
};
