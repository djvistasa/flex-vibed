import type { IApiResponse, UtilityFunction, UtilityType } from "./types";
import { BEARER_TOKEN, BASE_URL } from "@common/config/env";

export const formatString = (str: string): string => {
  return str.trim().toLowerCase();
};

export const validateType = (value: unknown, type: UtilityType): boolean => {
  return typeof value === type;
};

export const createUtilityFunction = (
  id: string,
  name: string
): UtilityFunction => {
  return { id, name };
};

export const calculateRem = (size: number): string => {
  return `${size / 16}rem`;
};

// Helper function to format time from minutes to readable format
export const formatTime = (timeInMinutes: number): string => {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const displayMinutes = minutes.toString().padStart(2, "0");
  return `${displayHours}:${displayMinutes} ${period}`;
};

// Helper function to format date to readable format
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// Helper function to format date range
export const formatDateRange = (
  startDate: Date | null,
  endDate: Date | null,
  placeholder: string = "Select dates"
): string => {
  if (startDate && endDate) {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }
  if (startDate) {
    return formatDate(startDate);
  }
  return placeholder;
};

const handleApiSuccess = (data: unknown): IApiResponse => ({
  ok: true,
  result: data,
  error: null,
});

const handleApiError = (error: unknown): IApiResponse => ({
  ok: false,
  result: null,
  error: error,
});

export const makeApiRequest = async (
  url: string,
  options?: RequestInit
): Promise<IApiResponse> => {
  const bearerToken = BEARER_TOKEN;
  const baseUrl = BASE_URL;

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      accept: "application/json",
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    return handleApiError(data);
  }

  return handleApiSuccess(data);
};
