import { screen } from "@testing-library/react";
import { vi } from "vitest";
import useTestComponentWithTheme from "@common/hooks/useTestComponentWithTheme";
import { AutoGoogleReviews } from "./index";

// Mock the useFindGooglePlaceId hook
vi.mock("@common/hooks/useFindGooglePlaceId", () => ({
  useFindGooglePlaceId: vi.fn(),
}));

// Mock the GoogleReviews component
vi.mock("@common/components/googleReviews", () => ({
  GoogleReviews: ({ placeId }: { placeId: string }) => (
    <div data-testid="google-reviews">Google Reviews for {placeId}</div>
  ),
}));

// Import mocked modules
import { useFindGooglePlaceId } from "@common/hooks/useFindGooglePlaceId";

const mockUseFindGooglePlaceId = vi.mocked(useFindGooglePlaceId);

describe("AutoGoogleReviews", () => {
  const renderWithTheme = useTestComponentWithTheme();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    mockUseFindGooglePlaceId.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithTheme(<AutoGoogleReviews lat={53.5403} lng={8.58936} />);
    expect(screen.getByText("Finding Google place...")).toBeTruthy();
  });

  it("renders error state", () => {
    const mockError = new Error("API Error");
    mockUseFindGooglePlaceId.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: mockError,
      refetch: vi.fn(),
    });

    renderWithTheme(<AutoGoogleReviews lat={53.5403} lng={8.58936} />);
    expect(
      screen.getByText("Error finding Google place: API Error")
    ).toBeTruthy();
  });

  it("renders no place found state", () => {
    mockUseFindGooglePlaceId.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithTheme(<AutoGoogleReviews lat={53.5403} lng={8.58936} />);
    expect(
      screen.getByText("No Google place found for this location.")
    ).toBeTruthy();
  });

  it("renders GoogleReviews component when place ID is found", () => {
    mockUseFindGooglePlaceId.mockReturnValue({
      data: "ChIJN1t_tDeuEmsRUsoyG83frY4",
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithTheme(<AutoGoogleReviews lat={53.5403} lng={8.58936} />);
    expect(screen.getByTestId("google-reviews")).toBeTruthy();
    expect(
      screen.getByText("Google Reviews for ChIJN1t_tDeuEmsRUsoyG83frY4")
    ).toBeTruthy();
  });

  it("passes custom radius to hook", () => {
    mockUseFindGooglePlaceId.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithTheme(
      <AutoGoogleReviews lat={53.5403} lng={8.58936} radius={200} />
    );

    expect(mockUseFindGooglePlaceId).toHaveBeenCalledWith(
      53.5403,
      8.58936,
      200
    );
  });
});
