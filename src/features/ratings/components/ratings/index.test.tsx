import { vi, expect, describe, beforeEach, it } from "vitest";
import { screen } from "@testing-library/react";
import useTestComponentWithTheme from "@common/hooks/useTestComponentWithTheme";
import { Ratings } from "./index";

// Mock the useRatings hook
vi.mock("../../hooks/useRatings", () => ({
  useRatings: vi.fn(),
}));

// Mock the rating store
vi.mock("../../store", () => ({
  useRatingStore: vi.fn((selector) => {
    const store = {
      filteredRatings: [],
      ratings: [],
    };
    return selector(store);
  }),
}));

// Mock the Rating component
vi.mock("../rating", () => ({
  Rating: ({ rating }: any) => (
    <div data-testid="rating">{rating.listingName}</div>
  ),
}));

// Import mocked modules
import { useRatings } from "../../hooks/useRatings";
import { useRatingStore } from "../../store";

const mockUseRatings = vi.mocked(useRatings);
const mockUseRatingStore = vi.mocked(useRatingStore);

describe("Ratings", () => {
  const renderWithTheme = useTestComponentWithTheme();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    mockUseRatings.mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    mockUseRatingStore.mockImplementation((selector) => {
      const store = {
        filteredRatings: [],
        ratings: [],
      };
      return selector(store);
    });

    renderWithTheme(<Ratings />);
  });

  it("displays loading state", () => {
    mockUseRatings.mockReturnValue({
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    mockUseRatingStore.mockImplementation((selector) => {
      const store = {
        filteredRatings: [],
        ratings: [],
      };
      return selector(store);
    });

    renderWithTheme(<Ratings />);
    expect(screen.getByText("Loading ratings...")).toBeTruthy();
  });

  it("displays error state", () => {
    mockUseRatings.mockReturnValue({
      isLoading: false,
      isError: true,
      error: new Error("Failed to load"),
      refetch: vi.fn(),
    });

    mockUseRatingStore.mockImplementation((selector) => {
      const store = {
        filteredRatings: [],
        ratings: [],
      };
      return selector(store);
    });

    renderWithTheme(<Ratings />);
    expect(screen.getByText(/Error loading ratings/)).toBeTruthy();
  });

  it("displays empty state when no ratings", () => {
    mockUseRatings.mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    mockUseRatingStore.mockImplementation((selector) => {
      const store = {
        filteredRatings: [],
        ratings: [],
      };
      return selector(store);
    });

    renderWithTheme(<Ratings />);
    expect(screen.getByText("No ratings found")).toBeTruthy();
  });

  it("renders ratings list", () => {
    const mockRatings = [
      { id: 1, listingName: "Test Listing 1" },
      { id: 2, listingName: "Test Listing 2" },
    ];

    mockUseRatings.mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    mockUseRatingStore.mockImplementation((selector) => {
      const store = {
        filteredRatings: mockRatings,
        ratings: mockRatings,
      };
      return selector(store);
    });

    renderWithTheme(<Ratings />);
    expect(screen.getAllByTestId("rating")).toHaveLength(2);
  });
});
