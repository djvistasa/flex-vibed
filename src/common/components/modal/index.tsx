import { useEffect, useRef } from "react";
import type { IModalProps } from "./types";
import {
  StyledModalOverlay,
  StyledModalContainer,
  StyledModalHeader,
  StyledModalTitle,
  StyledModalCloseButton,
  StyledModalBody,
  StyledModalFooter,
  StyledModalButton,
} from "./styles";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  showFooter = true,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmDisabled = false,
}: IModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const originalOverflowRef = useRef<string>("");

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Manage body scroll and focus
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElementRef.current = document.activeElement as HTMLElement;

      // Store original overflow value
      originalOverflowRef.current = document.body.style.overflow;

      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Focus the modal container for accessibility
      if (modalRef.current) {
        modalRef.current.focus();
      }
      return;
    }

    // Restore body scroll
    document.body.style.overflow = originalOverflowRef.current;

    // Restore focus to the previously focused element
    if (previousActiveElementRef.current) {
      previousActiveElementRef.current.focus();
    }

    return () => {
      // Cleanup: restore body scroll
      document.body.style.overflow = originalOverflowRef.current;
    };
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <StyledModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <StyledModalContainer ref={modalRef} tabIndex={-1}>
        {title && (
          <StyledModalHeader>
            <StyledModalTitle>{title}</StyledModalTitle>
            <StyledModalCloseButton onClick={onClose}>×</StyledModalCloseButton>
          </StyledModalHeader>
        )}

        <StyledModalBody>{children}</StyledModalBody>

        {showFooter && (
          <StyledModalFooter>
            {onCancel && (
              <StyledModalButton variant="secondary" onClick={onCancel}>
                {cancelText}
              </StyledModalButton>
            )}
            {onConfirm && (
              <StyledModalButton
                variant="primary"
                onClick={onConfirm}
                disabled={confirmDisabled}
              >
                {confirmText}
              </StyledModalButton>
            )}
          </StyledModalFooter>
        )}
      </StyledModalContainer>
    </StyledModalOverlay>
  );
}

export default Modal;
