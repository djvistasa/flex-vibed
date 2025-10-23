import { screen } from "@testing-library/react";
import useTestComponentWithTheme from "@common/hooks/useTestComponentWithTheme";
import NavBar from "./index";

// Mock the UI store
jest.mock("@common/stores/ui", () => ({
  useUIStore: jest.fn((selector) => {
    const store = {
      showModal: jest.fn(),
      hideModal: jest.fn(),
    };
    return selector(store);
  }),
}));

// Mock FilterForm component
jest.mock("@common/components/filterForm", () => ({
  FilterForm: () => <div>Filter Form</div>,
}));

describe("NavBar", () => {
  const renderWithTheme = useTestComponentWithTheme();

  beforeEach(() => {
    jest.clearAllMocks();
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
