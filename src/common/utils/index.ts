import type { IApiResponse, UtilityFunction, UtilityType } from "./types";

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
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
  const baseUrl = import.meta.env.VITE_BASE_URL;

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
