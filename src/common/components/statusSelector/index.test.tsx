import { vi, expect, describe, beforeEach, it } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import useTestComponentWithTheme from "@common/hooks/useTestComponentWithTheme";
import { StatusSelector } from "./index";
import type { IRatingStatus } from "@features/ratings/store/types";

describe("StatusSelector", () => {
  const renderWithTheme = useTestComponentWithTheme();
  const mockOnStatusSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all status options", () => {
    renderWithTheme(
      <StatusSelector
        currentStatus="awaiting"
        onStatusSelect={mockOnStatusSelect}
      />
    );

    expect(screen.getByText("Awaiting")).toBeTruthy();
    expect(screen.getByText("Pending")).toBeTruthy();
    expect(screen.getByText("Scheduled")).toBeTruthy();
    expect(screen.getByText("Submitted")).toBeTruthy();
    expect(screen.getByText("Published")).toBeTruthy();
    expect(screen.getByText("Expired")).toBeTruthy();
    expect(screen.getByText("Completed")).toBeTruthy();
  });

  it("shows checkmark on current status initially", () => {
    renderWithTheme(
      <StatusSelector
        currentStatus="pending"
        onStatusSelect={mockOnStatusSelect}
      />
    );

    const checkmarks = screen.getAllByText("✓");
    // Should only have one visible checkmark
    expect(checkmarks.length).toBeGreaterThan(0);
  });

  it("calls onStatusSelect when a status is clicked", () => {
    renderWithTheme(
      <StatusSelector
        currentStatus="awaiting"
        onStatusSelect={mockOnStatusSelect}
      />
    );

    const completedOption = screen.getByText("Completed");
    fireEvent.click(completedOption);

    expect(mockOnStatusSelect).toHaveBeenCalledWith("completed");
    expect(mockOnStatusSelect).toHaveBeenCalledTimes(1);
  });

  it("updates selected status when different option is clicked", () => {
    renderWithTheme(
      <StatusSelector
        currentStatus="awaiting"
        onStatusSelect={mockOnStatusSelect}
      />
    );

    // Click on pending
    const pendingOption = screen.getByText("Pending");
    fireEvent.click(pendingOption);

    expect(mockOnStatusSelect).toHaveBeenCalledWith("pending");

    // Click on completed
    const completedOption = screen.getByText("Completed");
    fireEvent.click(completedOption);

    expect(mockOnStatusSelect).toHaveBeenCalledWith("completed");
    expect(mockOnStatusSelect).toHaveBeenCalledTimes(2);
  });

  it("handles all status types correctly", () => {
    const statuses: IRatingStatus[] = [
      "awaiting",
      "pending",
      "scheduled",
      "submitted",
      "published",
      "expired",
      "completed",
    ];

    statuses.forEach((status) => {
      const { unmount } = renderWithTheme(
        <StatusSelector
          currentStatus={status}
          onStatusSelect={mockOnStatusSelect}
        />
      );

      const capitalizedStatus =
        status.charAt(0).toUpperCase() + status.slice(1);
      expect(screen.getByText(capitalizedStatus)).toBeTruthy();

      unmount();
    });
  });
});
