// Helper function to calculate number of nights between two dates
export const calculateNights = (
  startDate: Date | null,
  endDate: Date | null
): number => {
  if (!startDate || !endDate) return 0;
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
