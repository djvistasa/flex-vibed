import { vi, expect, describe, beforeEach, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useUIStore } from "./index";

describe("useUIStore", () => {
  beforeEach(() => {
    const { result } = renderHook(() => useUIStore());
    act(() => {
      result.current.hideModal();
    });
  });

  describe("Modal Management", () => {
    it("initializes with modal closed", () => {
      const { result } = renderHook(() => useUIStore());
      expect(result.current.modal.isOpen).toBe(false);
    });

    describe("Simple Mode (children only)", () => {
      it("shows modal with just string children", () => {
        const { result } = renderHook(() => useUIStore());

        act(() => {
          result.current.showModal("Test content");
        });

        expect(result.current.modal.isOpen).toBe(true);
        expect(result.current.modal.children).toBe("Test content");
        expect(result.current.modal.title).toBeUndefined();
        expect(result.current.modal.showFooter).toBe(true);
        expect(result.current.modal.confirmText).toBe("Confirm");
        expect(result.current.modal.cancelText).toBe("Cancel");
      });

      it("shows modal with JSX children", () => {
        const { result } = renderHook(() => useUIStore());
        const jsxContent = <div>JSX Content</div>;

        act(() => {
          result.current.showModal(jsxContent);
        });

        expect(result.current.modal.isOpen).toBe(true);
        expect(result.current.modal.children).toBe(jsxContent);
      });

      it("shows modal with number children", () => {
        const { result } = renderHook(() => useUIStore());

        act(() => {
          result.current.showModal(42);
        });

        expect(result.current.modal.isOpen).toBe(true);
        expect(result.current.modal.children).toBe(42);
      });
    });

    describe("Advanced Mode (full config)", () => {
      it("shows modal with basic config", () => {
        const { result } = renderHook(() => useUIStore());

        act(() => {
          result.current.showModal({
            title: "Test Modal",
            children: "Test content",
          });
        });

        expect(result.current.modal.isOpen).toBe(true);
        expect(result.current.modal.title).toBe("Test Modal");
        expect(result.current.modal.children).toBe("Test content");
      });

      it("shows modal with full config", () => {
        const { result } = renderHook(() => useUIStore());
        const mockOnConfirm = vi.fn();
        const mockOnClose = vi.fn();

        act(() => {
          result.current.showModal({
            title: "Confirm Action",
            children: "Are you sure?",
            showFooter: true,
            confirmText: "Yes",
            cancelText: "No",
            onConfirm: mockOnConfirm,
            onClose: mockOnClose,
            confirmDisabled: false,
          });
        });

        expect(result.current.modal.isOpen).toBe(true);
        expect(result.current.modal.title).toBe("Confirm Action");
        expect(result.current.modal.confirmText).toBe("Yes");
        expect(result.current.modal.cancelText).toBe("No");
        expect(result.current.modal.onConfirm).toBe(mockOnConfirm);
        expect(result.current.modal.onClose).toBe(mockOnClose);
      });

      it("merges config with defaults when showing modal", () => {
        const { result } = renderHook(() => useUIStore());

        act(() => {
          result.current.showModal({
            title: "Test",
            children: "Content",
          });
        });

        expect(result.current.modal.showFooter).toBe(true);
        expect(result.current.modal.confirmText).toBe("Confirm");
        expect(result.current.modal.cancelText).toBe("Cancel");
        expect(result.current.modal.confirmDisabled).toBe(false);
      });
    });

    it("hides modal", () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.showModal({
          title: "Test Modal",
          children: "Test",
        });
      });

      expect(result.current.modal.isOpen).toBe(true);

      act(() => {
        result.current.hideModal();
      });

      expect(result.current.modal.isOpen).toBe(false);
    });

    it("resets modal to initial state when hiding", () => {
      const { result } = renderHook(() => useUIStore());
      const mockOnConfirm = vi.fn();

      act(() => {
        result.current.showModal({
          title: "Test Modal",
          confirmText: "Custom Confirm",
          onConfirm: mockOnConfirm,
          children: "Test",
        });
      });

      act(() => {
        result.current.hideModal();
      });

      expect(result.current.modal.isOpen).toBe(false);
      expect(result.current.modal.title).toBeUndefined();
      expect(result.current.modal.confirmText).toBe("Confirm");
      expect(result.current.modal.onConfirm).toBeUndefined();
    });
  });
});
