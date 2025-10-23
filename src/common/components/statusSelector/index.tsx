import { useState } from "react";
import type { IStatusSelectorProps } from "./types";
import type { IRatingStatus } from "@features/ratings/store/types";
import {
  StyledStatusList,
  StyledStatusOption,
  StyledStatusBadge,
  StyledCheckmark,
} from "./styles";

export function StatusSelector({
  currentStatus,
  onStatusSelect,
}: IStatusSelectorProps) {
  const [selectedStatus, setSelectedStatus] =
    useState<IRatingStatus>(currentStatus);

  const statusOptions: IRatingStatus[] = [
    "awaiting",
    "pending",
    "scheduled",
    "submitted",
    "published",
    "expired",
    "completed",
  ];

  const handleStatusClick = (status: IRatingStatus): void => {
    setSelectedStatus(status);
    onStatusSelect(status);
  };

  return (
    <StyledStatusList>
      {statusOptions.map((status: IRatingStatus) => (
        <StyledStatusOption
          key={status}
          status={status}
          isSelected={selectedStatus === status}
          onClick={() => handleStatusClick(status)}
        >
          <StyledStatusBadge>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </StyledStatusBadge>
          <StyledCheckmark isVisible={selectedStatus === status}>
            ✓
          </StyledCheckmark>
        </StyledStatusOption>
      ))}
    </StyledStatusList>
  );
}

export default StatusSelector;
