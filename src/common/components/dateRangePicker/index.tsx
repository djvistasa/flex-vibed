import { useState } from "react";
import {
  StyledDateRangePickerContainer,
  StyledDateInput,
  StyledCalendarIcon,
  StyledDateText,
  StyledDropdownIcon,
  StyledCalendarOverlay,
  StyledCalendarContainer,
  StyledCalendarHeader,
  StyledMonthYear,
  StyledNavButton,
  StyledCalendarGrid,
  StyledDayHeader,
  StyledSelectedRange,
  StyledClearButton,
} from "./styles";
import type { IDateRangePickerProps } from "./types";
import { MONTHS, DAYS_OF_WEEK } from "./constants";
import { formatDateRange } from "@common/utils";
import { CalendarDays } from "@common/components/calendarDays";

export function DateRangePicker({
  startDate,
  endDate,
  onDateChange,
  placeholder = "Select dates",
  disabled = false,
}: IDateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempStartDate, setTempStartDate] = useState<Date | null>(startDate);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(endDate);

  const handleDateClick = (day: number): void => {
    const clickedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      // Start new selection
      setTempStartDate(clickedDate);
      setTempEndDate(null);
      return;
    }

    if (tempStartDate && !tempEndDate) {
      // Complete the selection
      if (clickedDate < tempStartDate) {
        setTempEndDate(tempStartDate);
        setTempStartDate(clickedDate);
      } else {
        setTempEndDate(clickedDate);
      }
    }
  };

  const handleApplySelection = (): void => {
    if (tempStartDate && tempEndDate) {
      onDateChange(tempStartDate, tempEndDate);
      setIsOpen(false);
    }
  };

  const handleClearSelection = (): void => {
    setTempStartDate(null);
    setTempEndDate(null);
    onDateChange(null, null);
    setIsOpen(false);
  };

  const navigateMonth = (direction: "prev" | "next"): void => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  return (
    <StyledDateRangePickerContainer>
      <StyledDateInput
        onClick={() => !disabled && setIsOpen(!isOpen)}
        $disabled={disabled}
      >
        <StyledCalendarIcon>📅</StyledCalendarIcon>
        <StyledDateText>
          {formatDateRange(startDate, endDate, placeholder)}
        </StyledDateText>
        <StyledDropdownIcon $isOpen={isOpen}>▼</StyledDropdownIcon>
      </StyledDateInput>

      {isOpen && (
        <StyledCalendarOverlay onClick={() => setIsOpen(false)}>
          <StyledCalendarContainer onClick={(e) => e.stopPropagation()}>
            <StyledCalendarHeader>
              <StyledNavButton onClick={() => navigateMonth("prev")}>
                ‹
              </StyledNavButton>
              <StyledMonthYear>
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </StyledMonthYear>
              <StyledNavButton onClick={() => navigateMonth("next")}>
                ›
              </StyledNavButton>
            </StyledCalendarHeader>

            <StyledCalendarGrid>
              {DAYS_OF_WEEK.map((day) => (
                <StyledDayHeader key={day}>{day}</StyledDayHeader>
              ))}
              <CalendarDays
                currentMonth={currentMonth}
                tempStartDate={tempStartDate}
                tempEndDate={tempEndDate}
                onDateClick={handleDateClick}
              />
            </StyledCalendarGrid>

            <StyledSelectedRange>
              {tempStartDate && tempEndDate && (
                <StyledClearButton onClick={handleClearSelection}>
                  Clear
                </StyledClearButton>
              )}
              {tempStartDate && tempEndDate && (
                <button onClick={handleApplySelection}>Apply Selection</button>
              )}
            </StyledSelectedRange>
          </StyledCalendarContainer>
        </StyledCalendarOverlay>
      )}
    </StyledDateRangePickerContainer>
  );
}

export default DateRangePicker;
