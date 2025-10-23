import styled, { type DefaultTheme } from "styled-components";

// Helper function to get status color
const getStatusColor = (theme: DefaultTheme, status: string) => {
  switch (status) {
    case "completed":
      return theme.colors.success;
    case "published":
      return theme.colors.successDark;
    case "pending":
      return theme.colors.warning;
    case "awaiting":
      return theme.colors.info;
    case "scheduled":
      return theme.colors.primary;
    case "submitted":
      return theme.colors.primaryLight;
    case "expired":
      return theme.colors.error;
    default:
      return theme.colors.secondary;
  }
};

export const StyledStatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} 0;
`;

export const StyledStatusOption = styled.div<{
  isSelected: boolean;
  status: string;
}>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme, status }) => getStatusColor(theme, status)};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border: 2px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.colors.surface : "transparent"};
  box-shadow: ${({ isSelected }) =>
    isSelected ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "none"};
  transform: ${({ isSelected }) =>
    isSelected ? "translateX(4px)" : "translateX(0)"};

  &:hover {
    opacity: 0.9;
    transform: ${({ isSelected }) =>
      isSelected ? "translateX(4px) translateY(-2px)" : "translateY(-2px)"};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    border-color: ${({ theme }) => theme.colors.surface};
  }

  &:active {
    transform: ${({ isSelected }) =>
      isSelected ? "translateX(4px)" : "translateX(0)"};
    opacity: 0.95;
  }
`;

export const StyledStatusBadge = styled.span`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  flex: 1;
  text-align: left;
  transition: all 0.2s ease;
`;

export const StyledCheckmark = styled.span<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-left: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
`;
