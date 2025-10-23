import type { IRating } from "../hooks/useRatings/types";

export type ISortOrder = "asc" | "desc";

export type ISortField = "rating" | "status" | "arrivalDate" | "departureDate";

export type IRatingStatus =
  | "awaiting"
  | "pending"
  | "scheduled"
  | "submitted"
  | "published"
  | "expired"
  | "completed";

export type IStatusFilter = "all" | IRatingStatus;

export type IRatingStoreState = {
  ratings: IRating[];
  filteredRatings: IRating[];
  sortField: ISortField | null;
  sortOrder: ISortOrder;
  statusFilter: IStatusFilter;
};

export type IRatingStoreActions = {
  setRatings: (ratings: IRating[]) => void;
  sortByRating: (order: ISortOrder) => void;
  sortByStatus: () => void;
  sortByArrivalDate: (order: ISortOrder) => void;
  sortByDepartureDate: (order: ISortOrder) => void;
  filterByStatus: (status: IStatusFilter) => void;
  updateRatingStatus: (ratingId: number, status: IRatingStatus) => void;
  resetFilters: () => void;
};

export type IRatingStore = IRatingStoreState & IRatingStoreActions;
