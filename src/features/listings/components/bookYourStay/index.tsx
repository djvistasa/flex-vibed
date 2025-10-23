import { Card } from "@common/components/card";
import {
  StyledBookingContainer,
  StyledBookingHeader,
  StyledBookingTitle,
  StyledBookingSubtitle,
  StyledBookingContent,
  StyledBookingInputs,
  StyledDateInput,
  StyledGuestsInput,
  StyledBookingDetails,
  StyledDetailRow,
  StyledDetailLabel,
  StyledDetailValue,
  StyledPriceBreakdown,
  StyledCouponSection,
  StyledCouponPrompt,
  StyledCouponInput,
  StyledApplyButton,
  StyledTotalSection,
  StyledTotalLabel,
  StyledTotalValue,
  StyledActionButtons,
  StyledBookNowButton,
  StyledSendInquiryButton,
  StyledInstantBooking,
} from "./styles";

export function BookYourStay() {
  const handleBookNow = (): void => {
    // TODO: Implement book now functionality
    console.log("Book now clicked");
  };

  const handleSendInquiry = (): void => {
    // TODO: Implement send inquiry functionality
    console.log("Send inquiry clicked");
  };

  const handleApplyCoupon = (): void => {
    // TODO: Implement apply coupon functionality
    console.log("Apply coupon clicked");
  };

  return (
    <Card>
      <StyledBookingContainer>
        <StyledBookingHeader>
          <StyledBookingTitle>Book Your Stay</StyledBookingTitle>
          <StyledBookingSubtitle>
            Select dates to see prices
          </StyledBookingSubtitle>
        </StyledBookingHeader>

        <StyledBookingContent>
          <StyledBookingInputs>
            <StyledDateInput>📅 Nov 10 - Nov 13</StyledDateInput>
            <StyledGuestsInput>👥 1 ▼</StyledGuestsInput>
          </StyledBookingInputs>

          <StyledBookingDetails>
            <StyledDetailRow>
              <StyledDetailLabel>Check-in</StyledDetailLabel>
              <StyledDetailValue>Nov 10</StyledDetailValue>
            </StyledDetailRow>
            <StyledDetailRow>
              <StyledDetailLabel>Check-out</StyledDetailLabel>
              <StyledDetailValue>Nov 13</StyledDetailValue>
            </StyledDetailRow>
            <StyledDetailRow>
              <StyledDetailLabel>Guests</StyledDetailLabel>
              <StyledDetailValue>1 guests</StyledDetailValue>
            </StyledDetailRow>
          </StyledBookingDetails>

          <StyledPriceBreakdown>
            <StyledDetailRow>
              <StyledDetailLabel>Price per night (3 nights)</StyledDetailLabel>
              <StyledDetailValue>£399</StyledDetailValue>
            </StyledDetailRow>
            <StyledDetailRow>
              <StyledDetailLabel>Cleaning fee</StyledDetailLabel>
              <StyledDetailValue>£75</StyledDetailValue>
            </StyledDetailRow>
          </StyledPriceBreakdown>

          <StyledCouponSection>
            <StyledCouponPrompt>🏷️ Have a coupon?</StyledCouponPrompt>
            <StyledCouponInput>
              <input type="text" placeholder="Enter code" />
              <StyledApplyButton onClick={handleApplyCoupon}>
                Apply
              </StyledApplyButton>
            </StyledCouponInput>
          </StyledCouponSection>

          <StyledTotalSection>
            <StyledTotalLabel>total</StyledTotalLabel>
            <StyledTotalValue>£474</StyledTotalValue>
          </StyledTotalSection>

          <StyledActionButtons>
            <StyledBookNowButton onClick={handleBookNow}>
              📅 Book Now
            </StyledBookNowButton>
            <StyledSendInquiryButton onClick={handleSendInquiry}>
              💬 Send Inquiry
            </StyledSendInquiryButton>
          </StyledActionButtons>

          <StyledInstantBooking>
            ⚪ Instant booking confirmation
          </StyledInstantBooking>
        </StyledBookingContent>
      </StyledBookingContainer>
    </Card>
  );
}

export default BookYourStay;
