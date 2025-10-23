import { screen } from "@testing-library/react";
import useTestComponentWithTheme from "@common/hooks/useTestComponentWithTheme";
import { Card } from "./index";

describe("Card", () => {
  const renderWithTheme = useTestComponentWithTheme();

  it("should render children correctly", () => {
    renderWithTheme(
      <Card>
        <div>Test Content</div>
      </Card>
    );
    expect(screen.getByText("Test Content")).toBeTruthy();
  });

  it("should render multiple children", () => {
    renderWithTheme(
      <Card>
        <h1>Title</h1>
        <p>Description</p>
      </Card>
    );
    expect(screen.getByText("Title")).toBeTruthy();
    expect(screen.getByText("Description")).toBeTruthy();
  });

  it("should apply custom className", () => {
    const { container } = renderWithTheme(
      <Card className="custom-class">Content</Card>
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("custom-class");
  });

  it("should render as a div element", () => {
    const { container } = renderWithTheme(
      <Card>
        <div>Content</div>
      </Card>
    );
    const card = container.firstChild as HTMLElement;
    expect(card.tagName).toBe("DIV");
  });
});
