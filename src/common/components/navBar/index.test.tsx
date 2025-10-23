import useTestComponentWithTheme from "../../hooks/useTestComponentWithTheme/index";
import NavBar from "./index";

describe("NavBar", () => {
  const renderWithTheme = useTestComponentWithTheme();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { getByText } = renderWithTheme(<NavBar />);
    expect(getByText("The Flex Global")).toBeTruthy();
  });

  it("renders the brand name", () => {
    const { getByText } = renderWithTheme(<NavBar />);
    expect(getByText("The Flex Global")).toBeTruthy();
  });

  it("renders user profile when user is provided", () => {
    const { getByText } = renderWithTheme(<NavBar />);
    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("Admin")).toBeTruthy();
  });

  it("renders notification badge when notifications > 0", () => {
    const { getByText } = renderWithTheme(<NavBar />);
    expect(getByText("3")).toBeTruthy();
  });

  it("renders without user when user is not provided", () => {
    const { queryByText } = renderWithTheme(<NavBar />);
    expect(queryByText("John Doe")).toBeFalsy();
  });
});
