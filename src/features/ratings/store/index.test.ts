import { expect, describe, beforeEach, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRatingStore } from "./index";
import type { IRating } from "../hooks/useRatings/types";

const mockRatings: IRating[] = [
  {
    id: 1,
    accountId: 1,
    listingMapId: 155613,
    reservationId: 1,
    autoReviewId: null,
    timeDelta: null,
    scheduledDateTime: null,
    channelId: 2005,
    type: "guest-to-host",
    status: "awaiting",
    rating: null,
    externalReviewId: null,
    externalReservationId: null,
    publicReview: null,
    privateFeedback: null,
    revieweeResponse: null,
    isRevieweeRecommended: null,
    isCancelled: 0,
    autoReviewTemplateId: null,
    reviewCategory: [],
    departureDate: "2024-05-11 22:00:00",
    arrivalDate: "2024-05-06 08:00:00",
    listingName: "Beautiful apartment",
    guestName: "Andrew Peterson",
  },
  {
    id: 2,
    accountId: 2,
    listingMapId: 155615,
    reservationId: 2,
    autoReviewId: null,
    timeDelta: null,
    scheduledDateTime: null,
    channelId: 2005,
    type: "host-to-guest",
    status: "completed",
    rating: 5,
    externalReviewId: "REV-2024-001",
    externalReservationId: "RES-2024-001",
    publicReview: "Excellent guest!",
    privateFeedback: "Would definitely host again.",
    revieweeResponse: "Thank you!",
    isRevieweeRecommended: 1,
    isCancelled: 0,
    autoReviewTemplateId: null,
    reviewCategory: [],
    departureDate: "2024-01-15 11:00:00",
    arrivalDate: "2024-01-10 15:00:00",
    listingName: "Modern loft",
    guestName: "Sarah Johnson",
  },
  {
    id: 3,
    accountId: 3,
    listingMapId: 346994,
    reservationId: 3,
    autoReviewId: 123,
    timeDelta: 48,
    scheduledDateTime: "2024-02-20 10:00:00",
    channelId: 2006,
    type: "guest-to-host",
    status: "pending",
    rating: 4,
    externalReviewId: "REV-2024-002",
    externalReservationId: "RES-2024-002",
    publicReview: "Great location!",
    privateFeedback: "Overall good experience.",
    revieweeResponse: null,
    isRevieweeRecommended: 1,
    isCancelled: 0,
    autoReviewTemplateId: 456,
    reviewCategory: [],
    departureDate: "2024-02-18 12:00:00",
    arrivalDate: "2024-02-12 14:00:00",
    listingName: "Charming studio",
    guestName: "Michael Chen",
  },
  {
    id: 4,
    accountId: 4,
    listingMapId: 234567,
    reservationId: 4,
    autoReviewId: 124,
    timeDelta: 36,
    scheduledDateTime: "2024-03-10 09:00:00",
    channelId: 2005,
    type: "host-to-guest",
    status: "completed",
    rating: 3,
    externalReviewId: "REV-2024-003",
    externalReservationId: "RES-2024-003",
    publicReview: "Good stay overall.",
    privateFeedback: "Guest was okay.",
    revieweeResponse: "Thanks!",
    isRevieweeRecommended: 0,
    isCancelled: 0,
    autoReviewTemplateId: 457,
    reviewCategory: [],
    departureDate: "2024-03-08 11:00:00",
    arrivalDate: "2024-03-05 16:00:00",
    listingName: "Spacious penthouse",
    guestName: "Emily Rodriguez",
  },
];

describe("useRatingStore", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useRatingStore());
    act(() => {
      result.current.resetFilters();
      result.current.setRatings([]);
    });
  });

  it("initializes with empty ratings", () => {
    const { result } = renderHook(() => useRatingStore());
    expect(result.current.ratings).toEqual([]);
    expect(result.current.filteredRatings).toEqual([]);
    expect(result.current.sortField).toBeNull();
    expect(result.current.sortOrder).toBe("asc");
    expect(result.current.statusFilter).toBe("all");
  });

  it("sets ratings", () => {
    const { result } = renderHook(() => useRatingStore());
    act(() => {
      result.current.setRatings(mockRatings);
    });
    expect(result.current.ratings).toEqual(mockRatings);
    expect(result.current.filteredRatings).toEqual(mockRatings);
  });

  describe("sortByRating", () => {
    it("sorts ratings in ascending order", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.sortByRating("asc");
      });
      const ratings = result.current.filteredRatings.map((r) => r.rating);
      expect(ratings).toEqual([3, 4, 5, null]);
    });

    it("sorts ratings in descending order", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.sortByRating("desc");
      });
      const ratings = result.current.filteredRatings.map((r) => r.rating);
      expect(ratings).toEqual([5, 4, 3, null]);
    });
  });

  describe("sortByStatus", () => {
    it("toggles sort order on each call", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.sortByStatus();
      });
      const firstOrder = result.current.sortOrder;
      const firstStatuses = result.current.filteredRatings.map((r) => r.status);

      act(() => {
        result.current.sortByStatus();
      });
      const secondOrder = result.current.sortOrder;
      const secondStatuses = result.current.filteredRatings.map(
        (r) => r.status
      );

      expect(firstOrder).not.toBe(secondOrder);
      expect(firstStatuses).not.toEqual(secondStatuses);
    });

    it("sorts by status alphabetically in descending order (first toggle)", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.sortByStatus(); // First call toggles from asc to desc
      });
      const statuses = result.current.filteredRatings.map((r) => r.status);
      expect(statuses).toEqual([
        "pending",
        "completed",
        "completed",
        "awaiting",
      ]);
    });
  });

  describe("sortByArrivalDate", () => {
    it("sorts by arrival date in ascending order", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.sortByArrivalDate("asc");
      });
      const dates = result.current.filteredRatings.map((r) => r.arrivalDate);
      expect(dates).toEqual([
        "2024-01-10 15:00:00",
        "2024-02-12 14:00:00",
        "2024-03-05 16:00:00",
        "2024-05-06 08:00:00",
      ]);
    });

    it("sorts by arrival date in descending order", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.sortByArrivalDate("desc");
      });
      const dates = result.current.filteredRatings.map((r) => r.arrivalDate);
      expect(dates).toEqual([
        "2024-05-06 08:00:00",
        "2024-03-05 16:00:00",
        "2024-02-12 14:00:00",
        "2024-01-10 15:00:00",
      ]);
    });
  });

  describe("sortByDepartureDate", () => {
    it("sorts by departure date in ascending order", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.sortByDepartureDate("asc");
      });
      const dates = result.current.filteredRatings.map((r) => r.departureDate);
      expect(dates).toEqual([
        "2024-01-15 11:00:00",
        "2024-02-18 12:00:00",
        "2024-03-08 11:00:00",
        "2024-05-11 22:00:00",
      ]);
    });

    it("sorts by departure date in descending order", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.sortByDepartureDate("desc");
      });
      const dates = result.current.filteredRatings.map((r) => r.departureDate);
      expect(dates).toEqual([
        "2024-05-11 22:00:00",
        "2024-03-08 11:00:00",
        "2024-02-18 12:00:00",
        "2024-01-15 11:00:00",
      ]);
    });
  });

  describe("filterByStatus", () => {
    it("filters by completed status", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.filterByStatus("completed");
      });
      expect(result.current.filteredRatings).toHaveLength(2);
      expect(
        result.current.filteredRatings.every((r) => r.status === "completed")
      ).toBe(true);
    });

    it("filters by pending status", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.filterByStatus("pending");
      });
      expect(result.current.filteredRatings).toHaveLength(1);
      expect(result.current.filteredRatings[0].status).toBe("pending");
    });

    it("filters by awaiting status", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.filterByStatus("awaiting");
      });
      expect(result.current.filteredRatings).toHaveLength(1);
      expect(result.current.filteredRatings[0].status).toBe("awaiting");
    });

    it("shows all ratings when filter is 'all'", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.filterByStatus("all");
      });
      expect(result.current.filteredRatings).toHaveLength(mockRatings.length);
    });
  });

  describe("combined filtering and sorting", () => {
    it("applies status filter and then sorts by rating", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.filterByStatus("completed");
        result.current.sortByRating("desc");
      });
      expect(result.current.filteredRatings).toHaveLength(2);
      const ratings = result.current.filteredRatings.map((r) => r.rating);
      expect(ratings).toEqual([5, 3]);
    });

    it("applies sorting and then filters by status", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.sortByRating("asc");
        result.current.filterByStatus("completed");
      });
      expect(result.current.filteredRatings).toHaveLength(2);
      const ratings = result.current.filteredRatings.map((r) => r.rating);
      expect(ratings).toEqual([3, 5]);
    });
  });

  describe("updateRatingStatus", () => {
    it("updates the status of a specific rating", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
      });

      const ratingToUpdate = result.current.ratings.find((r) => r.id === 1);
      expect(ratingToUpdate?.status).toBe("awaiting");

      act(() => {
        result.current.updateRatingStatus(1, "completed");
      });

      const updatedRating = result.current.ratings.find((r) => r.id === 1);
      expect(updatedRating?.status).toBe("completed");
    });

    it("updates filteredRatings after status change", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.filterByStatus("awaiting");
      });

      expect(result.current.filteredRatings).toHaveLength(1);
      expect(result.current.filteredRatings[0].id).toBe(1);

      // Change status from awaiting to completed
      act(() => {
        result.current.updateRatingStatus(1, "completed");
      });

      // Should no longer appear in "awaiting" filter
      expect(result.current.filteredRatings).toHaveLength(0);
    });

    it("preserves current filters and sorting after status update", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.sortByRating("desc");
        result.current.filterByStatus("completed");
      });

      const initialFilteredCount = result.current.filteredRatings.length;

      act(() => {
        result.current.updateRatingStatus(1, "completed");
      });

      // Filters should still be applied
      expect(result.current.statusFilter).toBe("completed");
      expect(result.current.sortField).toBe("rating");
      expect(result.current.sortOrder).toBe("desc");
      // Count should increase by 1 since we added one to "completed"
      expect(result.current.filteredRatings).toHaveLength(
        initialFilteredCount + 1
      );
    });
  });

  describe("resetFilters", () => {
    it("resets all filters and sorting", () => {
      const { result } = renderHook(() => useRatingStore());
      act(() => {
        result.current.setRatings(mockRatings);
        result.current.filterByStatus("completed");
        result.current.sortByRating("desc");
      });

      expect(result.current.statusFilter).toBe("completed");
      expect(result.current.sortField).toBe("rating");
      expect(result.current.sortOrder).toBe("desc");

      act(() => {
        result.current.resetFilters();
      });

      expect(result.current.statusFilter).toBe("all");
      expect(result.current.sortField).toBeNull();
      expect(result.current.sortOrder).toBe("asc");
      expect(result.current.filteredRatings).toEqual(mockRatings);
    });
  });
});
