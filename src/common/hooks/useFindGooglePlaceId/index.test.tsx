import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement, type ReactNode } from "react";
import { vi, expect, describe, beforeEach, it } from "vitest";
import { useFindGooglePlaceId } from "./index";

// Mock dependencies
vi.mock("../useGoogleReviews/utils", () => ({
  findGooglePlaceId: vi.fn(),
}));

// Import mocked modules
import { findGooglePlaceId } from "../useGoogleReviews/utils";

const mockFindGooglePlaceId = vi.mocked(findGooglePlaceId);

describe("useFindGooglePlaceId", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  const wrapper = ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);

  it("should find Google place ID successfully", async () => {
    const mockPlaceId = "ChIJN1t_tDeuEmsRUsoyG83frY4";
    mockFindGooglePlaceId.mockResolvedValue(mockPlaceId);

    const { result } = renderHook(
      () => useFindGooglePlaceId(53.5403, 8.58936),
      {
        wrapper,
      }
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBe(mockPlaceId);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockFindGooglePlaceId).toHaveBeenCalledWith(53.5403, 8.58936, 100);
  });

  it("should return null when no place is found", async () => {
    mockFindGooglePlaceId.mockResolvedValue(null);

    const { result } = renderHook(
      () => useFindGooglePlaceId(53.5403, 8.58936),
      {
        wrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should not fetch when coordinates are null", () => {
    const { result } = renderHook(() => useFindGooglePlaceId(null, null), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(mockFindGooglePlaceId).not.toHaveBeenCalled();
  });

  it("should use custom radius", async () => {
    const mockPlaceId = "ChIJN1t_tDeuEmsRUsoyG83frY4";
    mockFindGooglePlaceId.mockResolvedValue(mockPlaceId);

    const { result } = renderHook(
      () => useFindGooglePlaceId(53.5403, 8.58936, 200),
      {
        wrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockFindGooglePlaceId).toHaveBeenCalledWith(53.5403, 8.58936, 200);
  });
});
