export type ICalendarDaysProps = {
  currentMonth: Date;
  tempStartDate: Date | null;
  tempEndDate: Date | null;
  onDateClick: (day: number) => void;
};
