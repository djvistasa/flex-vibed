import type { IRating } from "../hooks/useRatings/types";
import type { IStatusFilter, ISortField, ISortOrder } from "./types";

export const applyFiltersAndSort = (
  ratings: IRating[],
  statusFilter: IStatusFilter,
  sortField: ISortField | null,
  sortOrder: ISortOrder
): IRating[] => {
  let result = [...ratings];

  // Apply status filter
  if (statusFilter !== "all") {
    result = result.filter((rating) => rating.status === statusFilter);
  }

  // Apply sorting
  if (sortField) {
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "rating":
          // Handle null ratings - always put them at the end regardless of sort order
          if (a.rating === null && b.rating === null) {
            comparison = 0;
            break;
          }

          if (a.rating === null) {
            return 1; // Always put null at the end
          }

          if (b.rating === null) {
            return -1; // Always put null at the end
          }

          comparison = a.rating - b.rating;
          break;

        case "status":
          // Sort alphabetically by status
          comparison = a.status.localeCompare(b.status);
          break;

        case "arrivalDate":
          comparison =
            new Date(a.arrivalDate).getTime() -
            new Date(b.arrivalDate).getTime();
          break;

        case "departureDate":
          comparison =
            new Date(a.departureDate).getTime() -
            new Date(b.departureDate).getTime();
          break;

        default:
          comparison = 0;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });
  }

  return result;
};
