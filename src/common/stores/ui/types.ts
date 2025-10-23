import type { ReactNode } from "react";

export type IModalConfig = {
  isOpen: boolean;
  title?: string;
  children?: ReactNode;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  confirmDisabled?: boolean;
};

export type IUIStoreState = {
  modal: IModalConfig;
};

// Simple mode: just pass children
export type ISimpleModalConfig = ReactNode;

// Advanced mode: pass full config
export type IAdvancedModalConfig = Omit<IModalConfig, "isOpen"> & {
  children: ReactNode;
};

export type IUIStoreActions = {
  showModal: (config: ISimpleModalConfig | IAdvancedModalConfig) => void;
  hideModal: () => void;
};

export type IUIStore = IUIStoreState & IUIStoreActions;
