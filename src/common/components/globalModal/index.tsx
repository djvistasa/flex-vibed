import { Modal } from "@common/components/modal";
import { useUIStore } from "@common/stores/ui";

export function GlobalModal() {
  const modal = useUIStore((state) => state.modal);
  const hideModal = useUIStore((state) => state.hideModal);

  const handleClose = () => {
    if (modal.onClose) {
      modal.onClose();
    }
    hideModal();
  };

  return (
    <Modal
      isOpen={modal.isOpen}
      title={modal.title}
      showFooter={modal.showFooter}
      confirmText={modal.confirmText}
      cancelText={modal.cancelText}
      onConfirm={modal.onConfirm}
      onCancel={modal.onCancel}
      onClose={handleClose}
      confirmDisabled={modal.confirmDisabled}
    >
      {modal.children}
    </Modal>
  );
}

export default GlobalModal;
