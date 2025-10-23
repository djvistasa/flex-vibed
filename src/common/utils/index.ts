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
