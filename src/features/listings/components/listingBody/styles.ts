import styled from "styled-components";
import { calculateRem } from "@common/utils";

export const StyledListingBodyContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};

  margin: 0 auto;
`;

export const StyledLeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const StyledRightSection = styled.div`
  position: sticky;
  top: calc(${calculateRem(84)} + ${calculateRem(5)});
  width: 30%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;
