import { ApiErrorResponse } from "@/types/response";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function formatError(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (error instanceof Error) {
    return error.message ?? fallback;
  }

  if (isFetchBaseQueryError(error)) {
    if (typeof error.data === "string") {
      return error.data;
    }

    if (typeof error.data === "object" && error.data !== null) {
      const data = error.data as ApiErrorResponse;

      if (data.message) return data.message;
      if (data.error) return data.error;
      console.log(error.data);
    }
  }

  return fallback;
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "data" in error;
}
