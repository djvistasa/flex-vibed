import { useState, useEffect, useRef } from "react";
import { DateRangePicker } from "@common/components/dateRangePicker";
import { formatDate } from "@common/utils";
import { calculateNights } from "./utils";
import {
  StyledBookingContainer,
  StyledBookingHeader,
  StyledBookingTitle,
  StyledBookingSubtitle,
  StyledBookingContent,
  StyledBookingInputs,
  StyledGuestsInput,
  StyledGuestsDropdown,
  StyledGuestsOption,
  StyledGuestsContainer,
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
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false);
  const guestsDropdownRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (start: Date | null, end: Date | null): void => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleGuestsChange = (newGuests: number): void => {
    setGuests(newGuests);
    setIsGuestsDropdownOpen(false);
  };

  const toggleGuestsDropdown = (): void => {
    setIsGuestsDropdownOpen(!isGuestsDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        guestsDropdownRef.current &&
        !guestsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsGuestsDropdownOpen(false);
      }
    };

    if (isGuestsDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isGuestsDropdownOpen]);

  const handleBookNow = (): void => {
    // TODO: Implement book now functionality
    console.log("Book now clicked", { startDate, endDate, guests });
  };

  const handleSendInquiry = (): void => {
    // TODO: Implement send inquiry functionality
    console.log("Send inquiry clicked", { startDate, endDate, guests });
  };

  const handleApplyCoupon = (): void => {
    // TODO: Implement apply coupon functionality
    console.log("Apply coupon clicked");
  };

  return (
    <StyledBookingContainer>
      <StyledBookingHeader>
        <StyledBookingTitle>Book Your Stay</StyledBookingTitle>
        <StyledBookingSubtitle>
          Select dates to see prices
        </StyledBookingSubtitle>
      </StyledBookingHeader>

      <StyledBookingContent>
        <StyledBookingInputs>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
            placeholder="Select dates"
          />
          <StyledGuestsContainer ref={guestsDropdownRef}>
            <StyledGuestsInput onClick={toggleGuestsDropdown}>
              👥 {guests} {guests === 1 ? "guest" : "guests"} ▼
            </StyledGuestsInput>
            {isGuestsDropdownOpen && (
              <StyledGuestsDropdown>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <StyledGuestsOption
                    key={num}
                    onClick={() => handleGuestsChange(num)}
                    $isSelected={guests === num}
                  >
                    {num} {num === 1 ? "guest" : "guests"}
                  </StyledGuestsOption>
                ))}
              </StyledGuestsDropdown>
            )}
          </StyledGuestsContainer>
        </StyledBookingInputs>

        <StyledBookingDetails>
          <StyledDetailRow>
            <StyledDetailLabel>Check-in</StyledDetailLabel>
            <StyledDetailValue>
              {startDate ? formatDate(startDate) : "Select dates"}
            </StyledDetailValue>
          </StyledDetailRow>
          <StyledDetailRow>
            <StyledDetailLabel>Check-out</StyledDetailLabel>
            <StyledDetailValue>
              {endDate ? formatDate(endDate) : "Select dates"}
            </StyledDetailValue>
          </StyledDetailRow>
          <StyledDetailRow>
            <StyledDetailLabel>Guests</StyledDetailLabel>
            <StyledDetailValue>
              {guests} {guests === 1 ? "guest" : "guests"}
            </StyledDetailValue>
          </StyledDetailRow>
        </StyledBookingDetails>

        <StyledPriceBreakdown>
          <StyledDetailRow>
            <StyledDetailLabel>
              Price per night ({calculateNights(startDate, endDate)}{" "}
              {calculateNights(startDate, endDate) === 1 ? "night" : "nights"})
            </StyledDetailLabel>
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
  );
}

export default BookYourStay;
