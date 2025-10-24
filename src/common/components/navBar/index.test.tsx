import { vi } from "vitest";
import { screen } from "@testing-library/react";
import useTestComponentWithTheme from "@common/hooks/useTestComponentWithTheme";
import NavBar from "./index";

// Mock the UI store
vi.mock("@common/stores/ui", () => ({
  useUIStore: vi.fn((selector) => {
    const store = {
      showModal: vi.fn(),
      hideModal: vi.fn(),
    };
    return selector(store);
  }),
}));

// Mock FilterForm component
vi.mock("@common/components/filterForm", () => ({
  FilterForm: () => <div>Filter Form</div>,
}));

describe("NavBar", () => {
  const renderWithTheme = useTestComponentWithTheme();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the brand name", () => {
    renderWithTheme(<NavBar />, { withRouter: true });
    expect(screen.getByText("The Flex Global")).toBeTruthy();
  });

  it("shows Filter & Sort button on home page", () => {
    renderWithTheme(<NavBar />, { withRouter: true, initialRoute: "/" });
    expect(screen.getByText("Filter & Sort")).toBeTruthy();
  });

  it("hides Filter & Sort button on other pages", () => {
    renderWithTheme(<NavBar />, {
      withRouter: true,
      initialRoute: "/listing/123",
    });
    expect(screen.queryByText("Filter & Sort")).toBeFalsy();
  });
});
