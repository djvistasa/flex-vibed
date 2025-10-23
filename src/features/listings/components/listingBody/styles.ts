import styled from "styled-components";

export const StyledListingBodyContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};

  margin: 0 auto;
`;

export const StyledLeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const StyledRightSection = styled.div`
  display: flex;
  flex-direction: column;
`;
