import {
  StyledStayPoliciesContainer,
  StyledTitle,
  StyledSection,
  StyledSectionHeader,
  StyledSectionIcon,
  StyledSectionTitle,
  StyledTimeContainer,
  StyledTimeBox,
  StyledTimeLabel,
  StyledTimeValue,
  StyledRulesGrid,
  StyledRuleBox,
  StyledRuleIcon,
  StyledRuleText,
  StyledPolicySection,
  StyledPolicySubsection,
  StyledPolicyTitle,
  StyledPolicyList,
  StyledPolicyItem,
  StyledPolicyBullet,
  StyledPolicyText,
} from "./styles";
import type { IStayPoliciesProps } from "./types";
import { formatTime } from "@common/utils";
import { parseHouseRules } from "./utils";

export function StayPolicies({ listing }: IStayPoliciesProps) {
  const checkInTime = formatTime(listing.checkInTimeStart);
  const checkOutTime = formatTime(listing.checkOutTime);
  const houseRules = parseHouseRules(listing.houseRules);

  return (
    <StyledStayPoliciesContainer>
      <StyledTitle>Stay Policies</StyledTitle>

      {/* Check-in & Check-out Section */}
      <StyledSection>
        <StyledSectionHeader>
          <StyledSectionIcon>🕐</StyledSectionIcon>
          <StyledSectionTitle>Check-in & Check-out</StyledSectionTitle>
        </StyledSectionHeader>
        <StyledTimeContainer>
          <StyledTimeBox>
            <StyledTimeLabel>Check-in Time</StyledTimeLabel>
            <StyledTimeValue>{checkInTime}</StyledTimeValue>
          </StyledTimeBox>
          <StyledTimeBox>
            <StyledTimeLabel>Check-out Time</StyledTimeLabel>
            <StyledTimeValue>{checkOutTime}</StyledTimeValue>
          </StyledTimeBox>
        </StyledTimeContainer>
      </StyledSection>

      {/* House Rules Section */}
      <StyledSection>
        <StyledSectionHeader>
          <StyledSectionIcon>🛡️</StyledSectionIcon>
          <StyledSectionTitle>House Rules</StyledSectionTitle>
        </StyledSectionHeader>
        <StyledRulesGrid>
          {houseRules.map((rule, index) => (
            <StyledRuleBox key={index}>
              <StyledRuleIcon>{rule.icon}</StyledRuleIcon>
              <StyledRuleText>{rule.text}</StyledRuleText>
            </StyledRuleBox>
          ))}
        </StyledRulesGrid>
      </StyledSection>

      {/* Cancellation Policy Section */}
      <StyledSection>
        <StyledSectionHeader>
          <StyledSectionIcon>📅</StyledSectionIcon>
          <StyledSectionTitle>Cancellation Policy</StyledSectionTitle>
        </StyledSectionHeader>
        <StyledPolicySection>
          <StyledPolicySubsection>
            <StyledPolicyTitle>For stays less than 28 days</StyledPolicyTitle>
            <StyledPolicyList>
              <StyledPolicyItem>
                <StyledPolicyBullet>•</StyledPolicyBullet>
                <StyledPolicyText>
                  Full refund up to 14 days before check-in
                </StyledPolicyText>
              </StyledPolicyItem>
              <StyledPolicyItem>
                <StyledPolicyBullet>•</StyledPolicyBullet>
                <StyledPolicyText>
                  No refund for bookings less than 14 days before check-in
                </StyledPolicyText>
              </StyledPolicyItem>
            </StyledPolicyList>
          </StyledPolicySubsection>

          <StyledPolicySubsection>
            <StyledPolicyTitle>For stays of 28 days or more</StyledPolicyTitle>
            <StyledPolicyList>
              <StyledPolicyItem>
                <StyledPolicyBullet>•</StyledPolicyBullet>
                <StyledPolicyText>
                  Full refund up to 30 days before check-in
                </StyledPolicyText>
              </StyledPolicyItem>
              <StyledPolicyItem>
                <StyledPolicyBullet>•</StyledPolicyBullet>
                <StyledPolicyText>
                  No refund for bookings less than 30 days before check-in
                </StyledPolicyText>
              </StyledPolicyItem>
            </StyledPolicyList>
          </StyledPolicySubsection>
        </StyledPolicySection>
      </StyledSection>
    </StyledStayPoliciesContainer>
  );
}

export default StayPolicies;
