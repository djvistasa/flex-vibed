import { vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import useTestComponentWithTheme from "@common/hooks/useTestComponentWithTheme";
import { GlobalModal } from "./index";
import { useUIStore } from "@common/stores/ui";

// Mock the UI store
vi.mock("@common/stores/ui", () => ({
  useUIStore: vi.fn(),
}));

describe("GlobalModal", () => {
  const renderWithTheme = useTestComponentWithTheme();
  const mockHideModal = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders modal when isOpen is true", () => {
    (useUIStore as unknown as vi.Mock).mockImplementation((selector) =>
      selector({
        modal: {
          isOpen: true,
          title: "Test Title",
          children: "Test content",
          showFooter: true,
          confirmText: "Confirm",
          cancelText: "Cancel",
          onConfirm: undefined,
          onClose: undefined,
          confirmDisabled: false,
        },
        hideModal: mockHideModal,
      })
    );

    renderWithTheme(<GlobalModal />);

    expect(screen.getByText("Test Title")).toBeTruthy();
    expect(screen.getByText("Test content")).toBeTruthy();
  });

  it("does not render modal when isOpen is false", () => {
    (useUIStore as unknown as vi.Mock).mockImplementation((selector) =>
      selector({
        modal: {
          isOpen: false,
          title: "Test Title",
          children: "Test content",
          showFooter: true,
          confirmText: "Confirm",
          cancelText: "Cancel",
          onConfirm: undefined,
          onClose: undefined,
          confirmDisabled: false,
        },
        hideModal: mockHideModal,
      })
    );

    renderWithTheme(<GlobalModal />);

    expect(screen.queryByText("Test Title")).toBeFalsy();
  });

  it("calls hideModal when close button is clicked", () => {
    (useUIStore as unknown as vi.Mock).mockImplementation((selector) =>
      selector({
        modal: {
          isOpen: true,
          title: "Test Title",
          children: "Test content",
          showFooter: true,
          confirmText: "Confirm",
          cancelText: "Cancel",
          onConfirm: undefined,
          onClose: undefined,
          confirmDisabled: false,
        },
        hideModal: mockHideModal,
      })
    );

    renderWithTheme(<GlobalModal />);

    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    expect(mockHideModal).toHaveBeenCalledTimes(1);
  });

  it("calls both onClose callback and hideModal when close button is clicked", () => {
    (useUIStore as unknown as vi.Mock).mockImplementation((selector) =>
      selector({
        modal: {
          isOpen: true,
          title: "Test Title",
          children: "Test content",
          showFooter: true,
          confirmText: "Confirm",
          cancelText: "Cancel",
          onConfirm: undefined,
          onClose: mockOnClose,
          confirmDisabled: false,
        },
        hideModal: mockHideModal,
      })
    );

    renderWithTheme(<GlobalModal />);

    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockHideModal).toHaveBeenCalledTimes(1);
  });

  it("passes all modal props to Modal component", () => {
    const mockOnConfirm = vi.fn();
    const mockOnCancel = vi.fn();

    (useUIStore as unknown as vi.Mock).mockImplementation((selector) =>
      selector({
        modal: {
          isOpen: true,
          title: "Confirm Action",
          children: "Are you sure?",
          showFooter: true,
          confirmText: "Yes",
          cancelText: "No",
          onConfirm: mockOnConfirm,
          onCancel: mockOnCancel,
          onClose: mockOnClose,
          confirmDisabled: true,
        },
        hideModal: mockHideModal,
      })
    );

    renderWithTheme(<GlobalModal />);

    expect(screen.getByText("Confirm Action")).toBeTruthy();
    expect(screen.getByText("Are you sure?")).toBeTruthy();
    expect(screen.getByText("Yes")).toBeTruthy();
    expect(screen.getByText("No")).toBeTruthy();

    const confirmButton = screen.getByText("Yes") as HTMLButtonElement;
    expect(confirmButton.disabled).toBe(true);
  });
});
