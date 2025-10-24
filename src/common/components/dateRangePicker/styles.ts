import styled from "styled-components";

export const StyledDateRangePickerContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledDateInput = styled.div<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme, $disabled }) =>
      $disabled ? theme.colors.border : theme.colors.primary};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const StyledCalendarIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const StyledDateText = styled.span`
  flex: 1;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledDropdownIcon = styled.span<{ $isOpen: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;

export const StyledCalendarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
`;

export const StyledCalendarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  min-width: 320px;
  max-width: 400px;
`;

export const StyledCalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const StyledMonthYear = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamilyHeading};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const StyledNavButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const StyledCalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const StyledDayHeader = styled.div`
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const StyledDayCell = styled.div`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledDayButton = styled.button<{
  $isSelected?: boolean;
  $isInRange?: boolean;
  $isToday?: boolean;
}>`
  width: 100%;
  height: 100%;
  border: none;
  background: ${({ theme, $isSelected, $isInRange, $isToday }) => {
    if ($isSelected) return theme.colors.primary;
    if ($isInRange) return theme.colors.primaryLight;
    if ($isToday) return theme.colors.surfaceHover;
    return "transparent";
  }};
  color: ${({ theme, $isSelected, $isInRange }) => {
    if ($isSelected || $isInRange) return theme.colors.surface;
    return theme.colors.text;
  }};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme, $isToday }) =>
    $isToday
      ? theme.typography.fontWeight.semibold
      : theme.typography.fontWeight.normal};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme, $isSelected, $isInRange }) => {
      if ($isSelected || $isInRange) return theme.colors.primaryDark;
      return theme.colors.surfaceHover;
    }};
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const StyledSelectedRange = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  button {
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.surfaceHover};
    }

    &:last-child {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.surface};
      border-color: ${({ theme }) => theme.colors.primary};

      &:hover {
        background-color: ${({ theme }) => theme.colors.primaryDark};
      }
    }
  }
`;

export const StyledClearButton = styled.button`
  color: ${({ theme }) => theme.colors.error};
  border-color: ${({ theme }) => theme.colors.error};

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.surface};
  }
`;
