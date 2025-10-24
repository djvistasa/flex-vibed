export type IDateRangePickerProps = {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
};
