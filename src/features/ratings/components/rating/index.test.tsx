import { render, screen } from "@testing-library/react";
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
};

describe("Rating", () => {
  it("renders without crashing", () => {
    render(<Rating rating={mockRatingWithValue} />);
  });

  it("displays the listing name", () => {
    render(<Rating rating={mockRatingWithValue} />);
    expect(
      screen.getByText("Beautiful and cozy apartment close to city center")
    ).toBeTruthy();
  });

  it("displays the review status", () => {
    render(<Rating rating={mockRatingWithValue} />);
    expect(screen.getByText("Completed")).toBeTruthy();
  });

  it("displays rating value with stars", () => {
    render(<Rating rating={mockRatingWithValue} />);
    expect(screen.getByText("(5/5)")).toBeTruthy();
  });

  it("displays 'Not rated yet' for null ratings", () => {
    render(<Rating rating={mockRatingWithoutValue} />);
    expect(screen.getByText("Not rated yet")).toBeTruthy();
  });

  it("displays correct number of filled stars", () => {
    render(<Rating rating={mockRatingWithValue} />);
    const starsContainer = screen.getByText("★");
    expect(starsContainer).toBeTruthy();
  });

  it("displays review categories when available", () => {
    render(<Rating rating={mockRatingWithValue} />);
    expect(screen.getByText("Review Categories")).toBeTruthy();
    expect(screen.getByText("cleanliness")).toBeTruthy();
    expect(screen.getByText("communication")).toBeTruthy();
    expect(screen.getByText("respect house rules")).toBeTruthy();
  });

  it("displays category ratings correctly", () => {
    render(<Rating rating={mockRatingWithValue} />);
    const categoryScores = screen.getAllByText("10/10");
    expect(categoryScores.length).toBe(3);
  });

  it("does not display review categories when empty", () => {
    render(<Rating rating={mockRatingWithoutValue} />);
    expect(screen.queryByText("Review Categories")).toBeFalsy();
  });
});
