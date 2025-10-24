// Helper functions for calendar days
export const isDateInRange = (
  date: Date,
  tempStartDate: Date | null,
  tempEndDate: Date | null
): boolean => {
  if (!tempStartDate || !tempEndDate) return false;
  return date >= tempStartDate && date <= tempEndDate;
};

export const isDateSelected = (
  date: Date,
  tempStartDate: Date | null,
  tempEndDate: Date | null
): boolean => {
  if (tempStartDate && date.getTime() === tempStartDate.getTime()) return true;
  if (tempEndDate && date.getTime() === tempEndDate.getTime()) return true;
  return false;
};
