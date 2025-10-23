import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { IRatingStore, ISortOrder, IStatusFilter } from "./types";
import type { IRating } from "../hooks/useRatings/types";
import { applyFiltersAndSort } from "./utils";

export const useRatingStore = create<IRatingStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        ratings: [],
        filteredRatings: [],
        sortField: null,
        sortOrder: "asc",
        statusFilter: "all",

        // Actions
        setRatings: (ratings: IRating[]) => {
          const { statusFilter, sortField, sortOrder } = get();
          const filtered = applyFiltersAndSort(
            ratings,
            statusFilter,
            sortField,
            sortOrder
          );
          set({
            ratings,
            filteredRatings: filtered,
          });
        },

        sortByRating: (order: ISortOrder) => {
          const { ratings, statusFilter } = get();
          const filtered = applyFiltersAndSort(
            ratings,
            statusFilter,
            "rating",
            order
          );
          set({
            sortField: "rating",
            sortOrder: order,
            filteredRatings: filtered,
          });
        },

        sortByStatus: () => {
          const { ratings, statusFilter, sortOrder } = get();
          const newOrder = sortOrder === "asc" ? "desc" : "asc";
          const filtered = applyFiltersAndSort(
            ratings,
            statusFilter,
            "status",
            newOrder
          );
          set({
            sortField: "status",
            sortOrder: newOrder,
            filteredRatings: filtered,
          });
        },

        sortByArrivalDate: (order: ISortOrder) => {
          const { ratings, statusFilter } = get();
          const filtered = applyFiltersAndSort(
            ratings,
            statusFilter,
            "arrivalDate",
            order
          );
          set({
            sortField: "arrivalDate",
            sortOrder: order,
            filteredRatings: filtered,
          });
        },

        sortByDepartureDate: (order: ISortOrder) => {
          const { ratings, statusFilter } = get();
          const filtered = applyFiltersAndSort(
            ratings,
            statusFilter,
            "departureDate",
            order
          );
          set({
            sortField: "departureDate",
            sortOrder: order,
            filteredRatings: filtered,
          });
        },

        filterByStatus: (status: IStatusFilter) => {
          const { ratings, sortField, sortOrder } = get();
          const filtered = applyFiltersAndSort(
            ratings,
            status,
            sortField,
            sortOrder
          );
          set({
            statusFilter: status,
            filteredRatings: filtered,
          });
        },

        updateRatingStatus: (ratingId: number, status: string) => {
          const { ratings, statusFilter, sortField, sortOrder } = get();
          // Update the rating in the source array
          const updatedRatings = ratings.map((rating) =>
            rating.id === ratingId ? { ...rating, status } : rating
          );
          // Re-apply filters and sorting to reflect the change
          const filtered = applyFiltersAndSort(
            updatedRatings,
            statusFilter,
            sortField,
            sortOrder
          );
          set({
            ratings: updatedRatings,
            filteredRatings: filtered,
          });
        },

        resetFilters: () => {
          const { ratings } = get();
          const filtered = applyFiltersAndSort(ratings, "all", null, "asc");
          set({
            sortField: null,
            sortOrder: "asc",
            statusFilter: "all",
            filteredRatings: filtered,
          });
        },
      }),
      {
        name: "rating-storage",
        version: 1,
        partialize: (state) => ({
          ratings: state.ratings,
        }),
        merge: (persistedState, currentState) => {
          const persisted = persistedState as Partial<IRatingStore>;

          const merged = {
            ...currentState,
            ratings: persisted.ratings || [],
          };

          if (merged.ratings.length > 0) {
            merged.filteredRatings = applyFiltersAndSort(
              merged.ratings,
              currentState.statusFilter,
              currentState.sortField,
              currentState.sortOrder
            );
          }

          return merged;
        },
      }
    ),
    {
      name: "rating-store",
    }
  )
);

export default useRatingStore;
