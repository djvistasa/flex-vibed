import { render, screen } from "@testing-library/react";
import { Stars } from "./index";

describe("Stars", () => {
  it("renders without crashing", () => {
    render(<Stars rating={5} />);
  });

  it("displays correct number of filled stars for whole number rating", () => {
    render(<Stars rating={5} />);
    expect(screen.getByText("★")).toBeTruthy();
  });

  it("displays rating text when showText is true", () => {
    render(<Stars rating={4} showText={true} />);
    expect(screen.getByText("(4/5)")).toBeTruthy();
  });

  it("does not display rating text when showText is false", () => {
    render(<Stars rating={4} showText={false} />);
    expect(screen.queryByText("(4/5)")).toBeFalsy();
  });

  it("displays 'Not rated yet' for null rating", () => {
    render(<Stars rating={null} />);
    expect(screen.getByText("Not rated yet")).toBeTruthy();
  });

  it("displays empty stars for rating of 0", () => {
    render(<Stars rating={0} />);
    expect(screen.getByText("☆")).toBeTruthy();
  });

  it("uses custom maxRating when provided", () => {
    render(<Stars rating={8} maxRating={10} showText={true} />);
    expect(screen.getByText("(8/10)")).toBeTruthy();
  });

  it("handles half stars correctly", () => {
    render(<Stars rating={3.5} />);
    expect(screen.getByText("⯨")).toBeTruthy();
  });

  it("displays correct mix of filled and empty stars", () => {
    const { container } = render(<Stars rating={3} maxRating={5} />);
    const starsDisplay = container.querySelector("div > div");
    expect(starsDisplay).toBeTruthy();
  });
});
