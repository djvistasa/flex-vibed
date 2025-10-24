import styled from "styled-components";

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
