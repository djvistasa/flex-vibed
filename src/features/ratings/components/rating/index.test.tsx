import { screen } from "@testing-library/react";
import useTestComponentWithTheme from "@common/hooks/useTestComponentWithTheme";
import { Rating } from "./index";
import type { IRating } from "../../hooks/useRatings/types";

const mockRatingWithValue: IRating = {
  id: 1,
  accountId: 1,
  listingMapId: 155613,
  reservationId: 1,
  autoReviewId: null,
  timeDelta: null,
  scheduledDateTime: null,
  channelId: 2005,
  type: "guest-to-host",
  status: "completed",
  rating: 5,
  externalReviewId: null,
  externalReservationId: null,
  publicReview: null,
  privateFeedback: null,
  revieweeResponse: null,
  isRevieweeRecommended: null,
  isCancelled: 0,
  autoReviewTemplateId: null,
  reviewCategory: [
    {
      category: "cleanliness",
      rating: 10,
    },
    {
      category: "communication",
      rating: 10,
    },
    {
      category: "respect_house_rules",
      rating: 10,
    },
  ],
  departureDate: "2021-05-11 22:00:00",
  arrivalDate: "2021-05-06 08:00:00",
  listingName: "Beautiful and cozy apartment close to city center",
  guestName: "Andrew Peterson",
};

const mockRatingWithoutValue: IRating = {
  ...mockRatingWithValue,
  id: 2,
  rating: null,
  status: "awaiting",
  reviewCategory: [],
};

// Mock the UI store
jest.mock("@common/stores/ui", () => ({
  useUIStore: jest.fn((selector) => {
    const store = {
      showModal: jest.fn(),
      hideModal: jest.fn(),
    };
    return selector(store);
  }),
}));

// Mock the rating store
jest.mock("../../store", () => ({
  useRatingStore: jest.fn((selector) => {
    const store = {
      changeRatingStatus: jest.fn(),
    };
    return selector(store);
  }),
}));

describe("Rating", () => {
  const renderWithTheme = useTestComponentWithTheme();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    renderWithTheme(<Rating rating={mockRatingWithValue} />, {
      withRouter: true,
    });
  });

  it("displays the listing name", () => {
    renderWithTheme(<Rating rating={mockRatingWithValue} />, {
      withRouter: true,
    });
    expect(
      screen.getByText("Beautiful and cozy apartment close to city center")
    ).toBeTruthy();
  });

  it("displays the review status", () => {
    renderWithTheme(<Rating rating={mockRatingWithValue} />, {
      withRouter: true,
    });
    expect(screen.getByText("Completed")).toBeTruthy();
  });

  it("displays rating value with stars", () => {
    renderWithTheme(<Rating rating={mockRatingWithValue} />, {
      withRouter: true,
    });
    expect(screen.getByText("(5/5)")).toBeTruthy();
  });

  it("displays 'Not rated yet' for null ratings", () => {
    renderWithTheme(<Rating rating={mockRatingWithoutValue} />, {
      withRouter: true,
    });
    expect(screen.getByText("Not rated yet")).toBeTruthy();
  });

  it("displays correct number of filled stars", () => {
    renderWithTheme(<Rating rating={mockRatingWithValue} />, {
      withRouter: true,
    });
    expect(screen.getAllByText("★").length).toBeGreaterThan(0);
  });

  it("displays review categories when available", () => {
    renderWithTheme(<Rating rating={mockRatingWithValue} />, {
      withRouter: true,
    });
    expect(screen.getByText("Review Categories")).toBeTruthy();
    expect(screen.getByText("cleanliness")).toBeTruthy();
    expect(screen.getByText("communication")).toBeTruthy();
    expect(screen.getByText("respect house rules")).toBeTruthy();
  });

  it("displays category ratings correctly", () => {
    renderWithTheme(<Rating rating={mockRatingWithValue} />, {
      withRouter: true,
    });
    const categoryScores = screen.getAllByText("10/10");
    expect(categoryScores.length).toBe(3);
  });

  it("does not display review categories when empty", () => {
    renderWithTheme(<Rating rating={mockRatingWithoutValue} />, {
      withRouter: true,
    });
    expect(screen.queryByText("Review Categories")).toBeFalsy();
  });
});
