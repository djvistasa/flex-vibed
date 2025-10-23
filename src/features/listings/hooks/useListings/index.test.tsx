import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement, type ReactNode } from "react";
import { useListings } from "./index";
import type { IListing } from "./types";

// Mock dependencies
jest.mock("@common/utils", () => ({
  makeApiRequest: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("@common/stores/ui", () => ({
  useUIStore: {
    getState: jest.fn(() => ({
      showModal: jest.fn(),
      hideModal: jest.fn(),
    })),
  },
}));

// Import after mocking
const { makeApiRequest } = jest.requireMock("@common/utils");
const { useParams: mockUseParams, useNavigate: mockUseNavigate } =
  jest.requireMock("react-router-dom");

const mockMakeApiRequest = makeApiRequest as jest.Mock;
const mockNavigate = jest.fn();

describe("useListings", () => {
  let queryClient: QueryClient;

  const mockListing: IListing = {
    id: 40160,
    propertyTypeId: 1,
    name: "Beautiful and cozy apartment close to city center",
    externalListingName: "Beautiful and cozy apartment close to city center",
    internalListingName: "Property #1",
    description: "In a classic Bremerhaven house we rent out our apartment",
    houseRules: "No smoking, no parties",
    keyPickup: "Self check-in with lockbox",
    specialInstruction: "Please remove shoes at entrance",
    doorSecurityCode: "ddff8",
    country: "Germany",
    countryCode: "DE",
    state: "Bremen",
    city: "Bremerhaven",
    street: "Schulstraße 7",
    address: "Schulstraße 7, Bremerhaven, Bremen 27570, Germany",
    publicAddress: "Bremerhaven, Bremen 27570, Germany",
    zipcode: "27570",
    price: 211.62,
    starRating: 2.5,
    averageReviewRating: 9.2,
    weeklyDiscount: 0.71,
    monthlyDiscount: 0.82,
    propertyRentTax: 12,
    guestPerPersonPerNightTax: 10,
    guestStayTax: 12,
    guestNightlyTax: 13,
    guestBathroomsNumber: 2,
    refundableDamageDeposit: 15,
    personCapacity: 6,
    maxChildrenAllowed: null,
    maxInfantsAllowed: null,
    maxPetsAllowed: null,
    lat: 53.5403,
    lng: 8.58936,
    checkInTimeStart: 12,
    checkInTimeEnd: 21,
    checkOutTime: 11,
    cancellationPolicy: "strict",
    cancellationPolicyId: 4010,
    vrboCancellationPolicyId: 4011,
    airBnbCancellationPolicyId: 4012,
    marriottCancellationPolicyId: 4013,
    bookingCancellationPolicyId: 4013,
    squareMeters: 10,
    roomType: "entire_home",
    bathroomType: "shared",
    bedroomsNumber: 1,
    bedsNumber: 1,
    bedType: "real_bed",
    bathroomsNumber: 1,
    minNights: 1,
    maxNights: 1125,
    guestsIncluded: 3,
    cleaningFee: 40.32,
    priceForExtraPerson: 54.01,
    instantBookable: 0,
    instantBookableLeadTime: 1,
    allowSameDayBooking: 2,
    sameDayBookingLeadTime: 12,
    contactName: "John",
    contactSurName: "Doe",
    contactPhone1: "+49123456789",
    contactPhone2: "+49987654321",
    contactLanguage: "de",
    contactEmail: "contact@example.com",
    contactAddress: "Schulstraße 7",
    language: "en",
    currencyCode: "USD",
    timeZoneName: "Europe/Berlin",
    wifiUsername: "guest",
    wifiPassword: "welcome123",
    cleannessStatus: null,
    cleaningInstruction: null,
    cleannessStatusUpdatedOn: null,
    homeawayPropertyName: "Beautiful and cozy apartment close to city center",
    homeawayPropertyHeadline: "Beautiful and cozy apartment",
    homeawayPropertyDescription: "In a classic Bremerhaven house",
    bookingcomPropertyName: "Beautiful and cozy apartment close to city center",
    bookingcomPropertyDescription: "In a classic Bremerhaven house",
    invoicingContactName: "Jane",
    invoicingContactSurName: "Smith",
    invoicingContactPhone1: "+11122334456",
    invoicingContactPhone2: "+11122334456",
    invoicingContactLanguage: "en",
    invoicingContactEmail: "invoice@company.com",
    invoicingContactAddress: "221B Baker Street",
    invoicingContactCity: "London",
    invoicingContactZipcode: "110011",
    invoicingContactCountry: "UK",
    propertyLicenseNumber: null,
    propertyLicenseType: null,
    propertyLicenseIssueDate: null,
    propertyLicenseExpirationDate: null,
    partnersListingMarkup: null,
    airbnbOfficialListingMarkup: null,
    bookingEngineMarkup: null,
    homeawayApiMarkup: null,
    marriottListingMarkup: null,
    isRentalAgreementActive: true,
    listingAgreementText: "Rental agreement text for listing",
    bookingcomPropertyRegisteredInVcs: false,
    bookingcomPropertyHasVat: false,
    bookingcomPropertyDeclaresRevenue: false,
    airbnbListingUrl: "https://www.airbnb.com/rooms/1234567",
    vrboListingUrl: "https://www.vrbo.com/1234567",
    googleVrListingUrl:
      "http://www.google.com/travel/hotels/entity/1234567/overview",
    airbnbName: "",
    airbnbSummary: "",
    airbnbSpace: null,
    airbnbAccess: null,
    airbnbInteraction: null,
    airbnbNeighborhoodOverview: null,
    airbnbTransit: null,
    airbnbNotes: null,
    insuranceEligibilityStatus: false,
    listingAmenities: [
      {
        id: 3449,
        amenityId: 2,
      },
    ],
    listingBedTypes: [
      {
        id: 1,
        bedTypeId: 2,
        quantity: 1,
      },
    ],
    listingImages: [
      {
        id: 877,
        caption: "Kitchen",
        url: "https://example.com/image1.jpg",
        sortOrder: 1,
      },
    ],
    customFieldValues: [
      {
        customFieldId: 167,
        value: "Custom field value one",
      },
    ],
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    });
    jest.clearAllMocks();
    mockUseParams.mockReturnValue({});
    mockUseNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    queryClient.clear();
  });

  const wrapper = ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);

  describe("Successful API Response", () => {
    it("should fetch listing data successfully", async () => {
      mockUseParams.mockReturnValue({ listingId: "40160" });
      mockMakeApiRequest.mockResolvedValue({
        ok: true,
        result: {
          status: "success",
          result: mockListing,
        },
        error: null,
      });

      const { result } = renderHook(() => useListings(), { wrapper });

      await waitFor(
        () => {
          expect(result.current.data).toEqual(mockListing);
        },
        { timeout: 3000 }
      );

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it("should call makeApiRequest with correct URL", async () => {
      mockUseParams.mockReturnValue({ listingId: "40160" });
      mockMakeApiRequest.mockResolvedValue({
        ok: true,
        result: {
          status: "success",
          result: mockListing,
        },
        error: null,
      });

      const { result } = renderHook(() => useListings(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockMakeApiRequest).toHaveBeenCalledWith("/listings/40160");
    });

    it("should use correct query key with listingId", async () => {
      mockUseParams.mockReturnValue({ listingId: "12345" });
      mockMakeApiRequest.mockResolvedValue({
        ok: true,
        result: {
          status: "success",
          result: mockListing,
        },
        error: null,
      });

      renderHook(() => useListings(), { wrapper });

      await waitFor(() => {
        const cache = queryClient.getQueryCache();
        const queries = cache.findAll();
        expect(queries.length).toBeGreaterThan(0);
        expect(queries[0].queryKey).toEqual(["get-listing", "12345"]);
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle API error response", async () => {
      mockUseParams.mockReturnValue({ listingId: "40160" });
      mockMakeApiRequest.mockResolvedValue({
        ok: false,
        result: null,
        error: "Failed to fetch listing",
      });

      const { result } = renderHook(() => useListings(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeTruthy();
      expect(result.current.error?.message).toBe("Failed to fetch listing");
      expect(result.current.data).toBe(null);
    });

    it("should handle network error", async () => {
      mockUseParams.mockReturnValue({ listingId: "40160" });
      mockMakeApiRequest.mockRejectedValue(new Error("Network error"));

      const { result } = renderHook(() => useListings(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeTruthy();
      expect(result.current.data).toBe(null);
    });
  });

  describe("Query Enabled/Disabled", () => {
    it("should not fetch when listingId is undefined", () => {
      mockUseParams.mockReturnValue({ listingId: undefined });

      const { result } = renderHook(() => useListings(), { wrapper });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBe(null);
      expect(mockMakeApiRequest).not.toHaveBeenCalled();
    });

    it("should not fetch when listingId is empty string", () => {
      mockUseParams.mockReturnValue({ listingId: "" });

      const { result } = renderHook(() => useListings(), { wrapper });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBe(null);
      expect(mockMakeApiRequest).not.toHaveBeenCalled();
    });

    it("should fetch when listingId is provided", async () => {
      mockUseParams.mockReturnValue({ listingId: "99999" });
      mockMakeApiRequest.mockResolvedValue({
        ok: true,
        result: {
          status: "success",
          result: mockListing,
        },
        error: null,
      });

      renderHook(() => useListings(), { wrapper });

      await waitFor(() => {
        expect(mockMakeApiRequest).toHaveBeenCalledWith("/listings/99999");
      });
    });
  });

  describe("Caching Behavior", () => {
    it("should cache listing data", async () => {
      mockUseParams.mockReturnValue({ listingId: "40160" });
      mockMakeApiRequest.mockResolvedValue({
        ok: true,
        result: {
          status: "success",
          result: mockListing,
        },
        error: null,
      });

      const { result: result1 } = renderHook(() => useListings(), { wrapper });

      await waitFor(() => {
        expect(result1.current.data).toEqual(mockListing);
      });

      expect(mockMakeApiRequest).toHaveBeenCalledTimes(1);

      // Second render should use cache
      const { result: result2 } = renderHook(() => useListings(), { wrapper });

      await waitFor(() => {
        expect(result2.current.data).toEqual(mockListing);
      });
      expect(mockMakeApiRequest).toHaveBeenCalledTimes(1); // Still only called once
    });

    it("should refetch when listingId changes", async () => {
      mockUseParams.mockReturnValue({ listingId: "40160" });
      mockMakeApiRequest.mockResolvedValue({
        ok: true,
        result: {
          status: "success",
          result: mockListing,
        },
        error: null,
      });

      const { rerender } = renderHook(() => useListings(), { wrapper });

      await waitFor(() => {
        expect(mockMakeApiRequest).toHaveBeenCalledWith("/listings/40160");
      });

      // Change listingId
      mockUseParams.mockReturnValue({ listingId: "40161" });
      rerender();

      await waitFor(() => {
        expect(mockMakeApiRequest).toHaveBeenCalledWith("/listings/40161");
      });

      expect(mockMakeApiRequest).toHaveBeenCalledTimes(2);
    });
  });

  describe("Data Structure", () => {
    it("should return data with correct structure", async () => {
      mockUseParams.mockReturnValue({ listingId: "40160" });
      mockMakeApiRequest.mockResolvedValue({
        ok: true,
        result: {
          status: "success",
          result: mockListing,
        },
        error: null,
      });

      const { result } = renderHook(() => useListings(), { wrapper });

      await waitFor(() => {
        expect(result.current.data).not.toBe(null);
      });

      expect(result.current.data).toHaveProperty("id");
      expect(result.current.data).toHaveProperty("name");
      expect(result.current.data).toHaveProperty("city");
      expect(result.current.data).toHaveProperty("price");
      expect(result.current.data).toHaveProperty("listingAmenities");
      expect(result.current.data).toHaveProperty("listingImages");
    });

    it("should return null data when not loaded", () => {
      mockUseParams.mockReturnValue({ listingId: undefined });

      const { result } = renderHook(() => useListings(), { wrapper });

      expect(result.current.data).toBe(null);
    });
  });

  describe("Return Values", () => {
    it("should return all required fields", async () => {
      mockUseParams.mockReturnValue({ listingId: "40160" });
      mockMakeApiRequest.mockResolvedValue({
        ok: true,
        result: {
          status: "success",
          result: mockListing,
        },
        error: null,
      });

      const { result } = renderHook(() => useListings(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current).toHaveProperty("isLoading");
      expect(result.current).toHaveProperty("isError");
      expect(result.current).toHaveProperty("error");
      expect(result.current).toHaveProperty("data");

      expect(typeof result.current.isLoading).toBe("boolean");
      expect(typeof result.current.isError).toBe("boolean");
      expect(
        result.current.error === null || result.current.error instanceof Error
      ).toBe(true);
      expect(
        result.current.data === null || typeof result.current.data === "object"
      ).toBe(true);
    });
  });
});
