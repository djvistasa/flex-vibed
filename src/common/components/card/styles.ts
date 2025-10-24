import styled from "styled-components";

export const StyledCard = styled.div<{ $hasPadding?: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme, $hasPadding = true }) =>
    $hasPadding ? theme.spacing.lg : 0};
  width: 100%;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;
