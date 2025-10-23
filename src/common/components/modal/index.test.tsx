import { screen, fireEvent } from "@testing-library/react";
import { Modal } from "./index";
import useTestComponentWithTheme from "@common/hooks/useTestComponentWithTheme";

describe("Modal", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const renderWithTheme = useTestComponentWithTheme();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders when isOpen is true", () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeTruthy();
    expect(screen.getByText("Modal content")).toBeTruthy();
  });

  it("does not render when isOpen is false", () => {
    renderWithTheme(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.queryByText("Test Modal")).toBeFalsy();
  });

  it("calls onClose when close button is clicked", () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when cancel button is clicked", () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when confirm button is clicked", () => {
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("disables confirm button when confirmDisabled is true", () => {
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        confirmDisabled={true}
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    const confirmButton = screen.getByText("Confirm") as HTMLButtonElement;
    expect(confirmButton.disabled).toBe(true);
  });

  it("uses custom button text", () => {
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        confirmText="Save"
        cancelText="Discard"
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText("Save")).toBeTruthy();
    expect(screen.getByText("Discard")).toBeTruthy();
  });

  it("hides footer when showFooter is false", () => {
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
        showFooter={false}
      >
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.queryByText("Cancel")).toBeFalsy();
    expect(screen.queryByText("Confirm")).toBeFalsy();
  });

  it("renders without title when not provided", () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText("Modal content")).toBeTruthy();
    expect(screen.queryByRole("heading")).toBeFalsy();
  });
});
