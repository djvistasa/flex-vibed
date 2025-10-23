import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type {
  IUseListingsReturnTypes,
  IListing,
  IFetchListingResponse,
  IApiErrorResponse,
} from "./types";
import { makeApiRequest } from "@common/utils";
import { useUIStore } from "@common/stores/ui";

export function useListings(): IUseListingsReturnTypes {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const showModal = useUIStore.getState().showModal;
  const hideModal = useUIStore.getState().hideModal;

  const handleGoBack = (): void => {
    hideModal();
    navigate("/");
  };

  const showErrorModal = (errorMessage: string): void => {
    showModal({
      title: "Error",
      children: (
        <div>
          <p>{errorMessage}</p>
        </div>
      ),
      showFooter: true,
      confirmText: "Okay",
      onConfirm: handleGoBack,
      onClose: handleGoBack,
    });
  };

  const { isLoading, isError, error, data } = useQuery<IListing>({
    queryKey: ["get-listing", listingId],
    queryFn: async () => {
      if (!listingId) {
        throw new Error("Listing ID is required");
      }

      const { ok, result, error } = await makeApiRequest(
        `/listings/${listingId}`
      );

      if (error) {
        // Parse error message
        let errorMessage = "Failed to fetch listing";
        if (typeof error === "object" && error !== null && "message" in error) {
          errorMessage = (error as IApiErrorResponse).message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }

        showErrorModal(errorMessage);
        throw new Error(errorMessage);
      }

      if (!ok) {
        const errorMessage = "Failed to fetch listing";
        showErrorModal(errorMessage);
        throw new Error(errorMessage);
      }

      if (!result) {
        const errorMessage = `Listing with ID ${listingId} not found`;
        showErrorModal(errorMessage);
        throw new Error(errorMessage);
      }

      const response = result as unknown as IFetchListingResponse;

      if (response.status === "fail") {
        const errorResponse = response as unknown as IApiErrorResponse;
        const errorMessage =
          errorResponse?.message || `Listing with ID ${listingId} not found`;

        showErrorModal(errorMessage);
        throw new Error(errorMessage);
      }

      if (!response.result) {
        const errorMessage = `Listing with ID ${listingId} not found`;
        showErrorModal(errorMessage);
        throw new Error(errorMessage);
      }

      return response.result;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!listingId,
    retry: false,
  });

  return {
    isLoading,
    isError,
    error,
    data: data ?? null,
  };
}

export default useListings;
