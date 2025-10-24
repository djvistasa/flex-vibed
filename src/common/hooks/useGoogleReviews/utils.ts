import type {
  IGoogleReview,
  IGooglePlacesResponse,
  IGoogleNearbySearchResponse,
} from "./types";
import { GOOGLE_PLACES_API_KEY } from "@common/config/env";
import { makeApiRequest } from "@common/utils";

export const findGooglePlaceId = async (
  lat: number,
  lng: number,
  radius: number = 100
): Promise<string | null> => {
  if (!GOOGLE_PLACES_API_KEY) {
    throw new Error("Google Places API key is not configured");
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=lodging&key=${GOOGLE_PLACES_API_KEY}`;

  const response = await makeApiRequest(url, { skipAuth: true });

  if (!response.ok) {
    throw new Error(`Failed to find Google place: ${response.error}`);
  }

  const data = response.result as IGoogleNearbySearchResponse;

  if (data.status !== "OK") {
    throw new Error(`Google Places API error: ${data.status}`);
  }

  // Return the first result's place_id, or null if no results
  return data.results.length > 0 ? data.results[0].place_id : null;
};

export const fetchGoogleReviews = async (
  placeId: string
): Promise<IGoogleReview[]> => {
  if (!GOOGLE_PLACES_API_KEY) {
    throw new Error("Google Places API key is not configured");
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${GOOGLE_PLACES_API_KEY}`;

  // Use makeApiRequest with skipAuth flag for external API
  const response = await makeApiRequest(url, { skipAuth: true });

  if (!response.ok) {
    throw new Error(`Failed to fetch Google reviews: ${response.error}`);
  }

  const data = response.result as IGooglePlacesResponse;

  if (data.status !== "OK") {
    throw new Error(`Google Places API error: ${data.status}`);
  }

  return data.result.reviews || [];
};
