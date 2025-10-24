import styled from "styled-components";
import { theme } from "@common/theme";

export const StyledGoogleReviewsContainer = styled.div`
  padding: ${theme.spacing.lg};
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

export const StyledTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const StyledCount = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
`;

export const StyledReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const StyledReviewItem = styled.div`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.background.white};
`;

export const StyledReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.sm};
`;

export const StyledAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const StyledAuthorName = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text};
`;

export const StyledAuthorPhoto = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const StyledRatingValue = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledReviewText = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text};
  line-height: 1.5;
  margin: 0 0 ${theme.spacing.sm} 0;
`;

export const StyledReviewDate = styled.span`
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.textSecondary};
`;

export const StyledNoReviews = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
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
