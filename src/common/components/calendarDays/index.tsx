import React from "react";
import { StyledDayCell, StyledDayButton } from "./styles";
import { isDateInRange, isDateSelected } from "./constants";
import type { ICalendarDaysProps } from "./types";

export function CalendarDays({
  currentMonth,
  tempStartDate,
  tempEndDate,
  onDateClick,
}: ICalendarDaysProps) {
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendarDays = (): React.JSX.Element[] => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: React.JSX.Element[] = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<StyledDayCell key={`empty-${i}`} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isSelected = isDateSelected(date, tempStartDate, tempEndDate);
      const isInRange = isDateInRange(date, tempStartDate, tempEndDate);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <StyledDayCell key={day}>
          <StyledDayButton
            $isSelected={isSelected}
            $isInRange={isInRange}
            $isToday={isToday}
            onClick={() => onDateClick(day)}
          >
            {day}
          </StyledDayButton>
        </StyledDayCell>
      );
    }

    return days;
  };

  return <>{renderCalendarDays()}</>;
}

export default CalendarDays;
