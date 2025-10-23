import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { IUIStore, IAdvancedModalConfig } from "./types";
import { isValidElement, type ReactNode } from "react";

const initialModalState = {
  isOpen: false,
  title: undefined,
  children: undefined,
  showFooter: true,
  confirmText: "Confirm",
  cancelText: "Cancel",
  onConfirm: undefined,
  onClose: undefined,
  confirmDisabled: false,
};

// Type guard to check if config is advanced mode (object with properties)
function isAdvancedConfig(
  config: ReactNode | IAdvancedModalConfig
): config is IAdvancedModalConfig {
  return (
    config !== null &&
    typeof config === "object" &&
    !isValidElement(config) &&
    "children" in config
  );
}

export const useUIStore = create<IUIStore>()(
  devtools(
    (set) => ({
      // State
      modal: initialModalState,

      // Actions
      showModal: (config) => {
        // Simple mode: just ReactNode children
        if (!isAdvancedConfig(config)) {
          set({
            modal: {
              ...initialModalState,
              children: config,
              isOpen: true,
            },
          });
          return;
        }

        // Advanced mode: full config object
        set({
          modal: {
            ...initialModalState,
            ...config,
            isOpen: true,
          },
        });
      },

      hideModal: () => {
        set({
          modal: initialModalState,
        });
      },
    }),
    {
      name: "ui-store",
    }
  )
);

export default useUIStore;
