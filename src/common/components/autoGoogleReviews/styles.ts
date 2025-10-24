import styled from "styled-components";
import { theme } from "@common/theme";

export const StyledAutoGoogleReviewsContainer = styled.div`
  padding: ${theme.spacing.lg};
`;

export const StyledLoadingMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
`;

export const StyledErrorMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
`;

export const StyledNoPlaceFound = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
`;
