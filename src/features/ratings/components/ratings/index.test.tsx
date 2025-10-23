import { screen } from "@testing-library/react";
import useTestComponentWithTheme from "@common/hooks/useTestComponentWithTheme";
import { Ratings } from "./index";

// Mock the useRatings hook
jest.mock("../../hooks/useRatings", () => ({
  useRatings: jest.fn(),
}));

// Mock the rating store
jest.mock("../../store", () => ({
  useRatingStore: jest.fn((selector) => {
    const store = {
      filteredRatings: [],
      ratings: [],
    };
    return selector(store);
  }),
}));

// Mock the Rating component
jest.mock("../rating", () => ({
  Rating: ({ rating }: any) => (
    <div data-testid="rating">{rating.listingName}</div>
  ),
}));

describe("Ratings", () => {
  const renderWithTheme = useTestComponentWithTheme();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { useRatings } = require("../../hooks/useRatings");
    const { useRatingStore } = require("../../store");

    useRatings.mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    useRatingStore.mockImplementation((selector) => {
      const store = {
        filteredRatings: [],
        ratings: [],
      };
      return selector(store);
    });

    renderWithTheme(<Ratings />);
  });

  it("displays loading state", () => {
    const { useRatings } = require("../../hooks/useRatings");
    const { useRatingStore } = require("../../store");

    useRatings.mockReturnValue({
      isLoading: true,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    useRatingStore.mockImplementation((selector) => {
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
    const { useRatings } = require("../../hooks/useRatings");
    const { useRatingStore } = require("../../store");

    useRatings.mockReturnValue({
      isLoading: false,
      isError: true,
      error: new Error("Failed to load"),
      refetch: jest.fn(),
    });

    useRatingStore.mockImplementation((selector) => {
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
    const { useRatings } = require("../../hooks/useRatings");
    const { useRatingStore } = require("../../store");

    useRatings.mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    useRatingStore.mockImplementation((selector) => {
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
    const { useRatings } = require("../../hooks/useRatings");
    const { useRatingStore } = require("../../store");

    const mockRatings = [
      { id: 1, listingName: "Test Listing 1" },
      { id: 2, listingName: "Test Listing 2" },
    ];

    useRatings.mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    useRatingStore.mockImplementation((selector) => {
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
