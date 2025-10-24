import { screen } from "@testing-library/react";
import { vi } from "vitest";
import useTestComponentWithTheme from "@common/hooks/useTestComponentWithTheme";
import { GoogleReviews } from "./index";
import type { IGoogleReview } from "@common/hooks/useGoogleReviews/types";

// Mock the useGoogleReviews hook
vi.mock("@common/hooks/useGoogleReviews", () => ({
  useGoogleReviews: vi.fn(),
}));

// Mock the Stars component
vi.mock("@common/components/stars", () => ({
  Stars: ({ rating }: { rating: number }) => (
    <div data-testid="stars">{rating} stars</div>
  ),
}));

// Import mocked modules
import { useGoogleReviews } from "@common/hooks/useGoogleReviews";

const mockUseGoogleReviews = vi.mocked(useGoogleReviews);

describe("GoogleReviews", () => {
  const renderWithTheme = useTestComponentWithTheme();
  const mockPlaceId = "test-place-id";

  const mockReviews: IGoogleReview[] = [
    {
      authorName: "John Doe",
      authorUrl: "https://example.com/john",
      profilePhotoUrl: "https://example.com/john.jpg",
      rating: 5,
      relativeTimeDescription: "2 weeks ago",
      text: "Great place to stay!",
      time: 1640995200000,
    },
    {
      authorName: "Jane Smith",
      rating: 4,
      relativeTimeDescription: "1 month ago",
      text: "Nice location, clean rooms.",
      time: 1638403200000,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    mockUseGoogleReviews.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithTheme(<GoogleReviews placeId={mockPlaceId} />);
    expect(screen.getByText("Loading Google reviews...")).toBeTruthy();
  });

  it("renders error state", () => {
    const mockError = new Error("API Error");
    mockUseGoogleReviews.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: mockError,
      refetch: vi.fn(),
    });

    renderWithTheme(<GoogleReviews placeId={mockPlaceId} />);
    expect(
      screen.getByText("Error loading Google reviews: API Error")
    ).toBeTruthy();
  });

  it("renders no reviews state", () => {
    mockUseGoogleReviews.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithTheme(<GoogleReviews placeId={mockPlaceId} />);
    expect(screen.getByText("Google Reviews")).toBeTruthy();
    expect(screen.getByText("0 reviews")).toBeTruthy();
    expect(
      screen.getByText("No Google reviews available for this location.")
    ).toBeTruthy();
  });

  it("renders reviews correctly", () => {
    mockUseGoogleReviews.mockReturnValue({
      data: mockReviews,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithTheme(<GoogleReviews placeId={mockPlaceId} />);

    expect(screen.getByText("Google Reviews")).toBeTruthy();
    expect(screen.getByText("2 reviews")).toBeTruthy();
    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("Jane Smith")).toBeTruthy();
    expect(screen.getByText("Great place to stay!")).toBeTruthy();
    expect(screen.getByText("Nice location, clean rooms.")).toBeTruthy();
    expect(screen.getByText("2 weeks ago")).toBeTruthy();
    expect(screen.getByText("1 month ago")).toBeTruthy();
  });

  it("renders author photos when available", () => {
    mockUseGoogleReviews.mockReturnValue({
      data: mockReviews,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithTheme(<GoogleReviews placeId={mockPlaceId} />);

    const authorPhoto = screen.getByAltText("John Doe");
    expect(authorPhoto).toBeTruthy();
    expect(authorPhoto.getAttribute("src")).toBe(
      "https://example.com/john.jpg"
    );
  });
});
