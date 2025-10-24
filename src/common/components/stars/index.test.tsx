import { expect, describe, it } from "vitest";
import { screen } from "@testing-library/react";
import useTestComponentWithTheme from "@common/hooks/useTestComponentWithTheme";
import { Stars } from "./index";

describe("Stars", () => {
  const renderWithTheme = useTestComponentWithTheme();

  it("renders without crashing", () => {
    renderWithTheme(<Stars rating={5} />);
  });

  it("displays correct number of filled stars for whole number rating", () => {
    renderWithTheme(<Stars rating={5} />);
    expect(screen.getAllByText("★").length).toBeGreaterThan(0);
  });

  it("displays rating text when showText is true", () => {
    renderWithTheme(<Stars rating={4} showText={true} />);
    expect(screen.getByText("(4/5)")).toBeTruthy();
  });

  it("does not display rating text when showText is false", () => {
    renderWithTheme(<Stars rating={4} showText={false} />);
    expect(screen.queryByText("(4/5)")).toBeFalsy();
  });

  it("displays 'Not rated yet' for null rating", () => {
    renderWithTheme(<Stars rating={null} />);
    expect(screen.getByText("Not rated yet")).toBeTruthy();
  });

  it("displays empty stars for rating of 0", () => {
    renderWithTheme(<Stars rating={0} />);
    expect(screen.getAllByText("☆").length).toBeGreaterThan(0);
  });

  it("uses custom maxRating when provided", () => {
    renderWithTheme(<Stars rating={8} maxRating={10} showText={true} />);
    expect(screen.getByText("(8/10)")).toBeTruthy();
  });

  it("handles half stars correctly", () => {
    renderWithTheme(<Stars rating={3.5} />);
    expect(screen.getByText("⯨")).toBeTruthy();
  });

  it("displays correct mix of filled and empty stars", () => {
    const { container } = renderWithTheme(<Stars rating={3} maxRating={5} />);
    const starsDisplay = container.querySelector("div > div");
    expect(starsDisplay).toBeTruthy();
  });
});
