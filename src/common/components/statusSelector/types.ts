import type { IRatingStatus } from "@features/ratings/store/types";

export type IStatusSelectorProps = {
  currentStatus: IRatingStatus;
  onStatusSelect: (status: IRatingStatus) => void;
};
