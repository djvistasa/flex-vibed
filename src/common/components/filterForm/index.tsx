import { useState } from "react";
import type { IFilterFormProps } from "./types";
import { useRatingStore } from "@features/ratings/store";
import type {
  ISortField,
  ISortOrder,
  IStatusFilter,
} from "@features/ratings/store/types";
import {
  StyledFilterForm,
  StyledFilterSection,
  StyledFilterLabel,
  StyledFilterSelect,
  StyledFilterGroup,
  StyledResetButton,
  StyledButtonGroup,
  StyledButton,
} from "./styles";

export function FilterForm({ onClose }: IFilterFormProps) {
  const sortByRating = useRatingStore((state) => state.sortByRating);
  const sortByStatus = useRatingStore((state) => state.sortByStatus);
  const sortByArrivalDate = useRatingStore((state) => state.sortByArrivalDate);
  const sortByDepartureDate = useRatingStore(
    (state) => state.sortByDepartureDate
  );
  const filterByStatus = useRatingStore((state) => state.filterByStatus);
  const resetFilters = useRatingStore((state) => state.resetFilters);

  const currentSortField = useRatingStore((state) => state.sortField);
  const currentSortOrder = useRatingStore((state) => state.sortOrder);
  const currentStatusFilter = useRatingStore((state) => state.statusFilter);

  const [sortField, setSortField] = useState<ISortField | "">(
    currentSortField || ""
  );
  const [sortOrder, setSortOrder] = useState<ISortOrder>(currentSortOrder);
  const [statusFilter, setStatusFilter] =
    useState<IStatusFilter>(currentStatusFilter);

  const handleApply = (): void => {
    if (sortField === "") {
      filterByStatus(statusFilter);
      onClose();
      return;
    }

    if (sortField === "rating") {
      filterByStatus(statusFilter);
      sortByRating(sortOrder);
      onClose();
      return;
    }

    if (sortField === "status") {
      filterByStatus(statusFilter);
      sortByStatus();
      onClose();
      return;
    }

    if (sortField === "arrivalDate") {
      filterByStatus(statusFilter);
      sortByArrivalDate(sortOrder);
      onClose();
      return;
    }

    if (sortField === "departureDate") {
      filterByStatus(statusFilter);
      sortByDepartureDate(sortOrder);
      onClose();
      return;
    }
  };

  const handleReset = (): void => {
    resetFilters();
    setSortField("");
    setSortOrder("asc");
    setStatusFilter("all");
  };

  const handleCancel = (): void => {
    setSortField(currentSortField || "");
    setSortOrder(currentSortOrder);
    setStatusFilter(currentStatusFilter);
    onClose();
  };

  return (
    <StyledFilterForm>
      <StyledFilterSection>
        <StyledFilterLabel>Status Filter</StyledFilterLabel>
        <StyledFilterSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as IStatusFilter)}
        >
          <option value="all">All Statuses</option>
          <option value="awaiting">Awaiting</option>
          <option value="pending">Pending</option>
          <option value="scheduled">Scheduled</option>
          <option value="submitted">Submitted</option>
          <option value="published">Published</option>
          <option value="expired">Expired</option>
          <option value="completed">Completed</option>
        </StyledFilterSelect>
      </StyledFilterSection>

      <StyledFilterSection>
        <StyledFilterLabel>Sort By</StyledFilterLabel>
        <StyledFilterGroup>
          <StyledFilterSelect
            value={sortField}
            onChange={(e) => setSortField(e.target.value as ISortField | "")}
          >
            <option value="">None</option>
            <option value="rating">Rating</option>
            <option value="status">Status</option>
            <option value="arrivalDate">Arrival Date</option>
            <option value="departureDate">Departure Date</option>
          </StyledFilterSelect>

          {sortField && sortField !== "status" && (
            <StyledFilterSelect
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as ISortOrder)}
            >
              <option value="desc">Highest - Lowest</option>
              <option value="asc">Lowest - Highest</option>
            </StyledFilterSelect>
          )}
        </StyledFilterGroup>
      </StyledFilterSection>

      <StyledResetButton type="button" onClick={handleReset}>
        Reset All Filters
      </StyledResetButton>

      <StyledButtonGroup>
        <StyledButton type="button" $variant="secondary" onClick={handleCancel}>
          Cancel
        </StyledButton>
        <StyledButton type="button" $variant="primary" onClick={handleApply}>
          Apply
        </StyledButton>
      </StyledButtonGroup>
    </StyledFilterForm>
  );
}

export default FilterForm;
