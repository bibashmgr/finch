import { Mutex } from "async-mutex";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { ApiErrorResponse } from "@/types/response";

const publicRoutes = [
  "/",
  "/terms-of-service",
  "/privacy-policy",
  "/login",
  "/verify-email",
];

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
    (result.error?.data as ApiErrorResponse)?.message === "Token expired"
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          if (!publicRoutes.includes(window.location.pathname)) {
            window.location.replace(
              `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL!}/login`,
            );
          }
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Profile", "Setting", "Categories", "Transactions"],
  endpoints: () => ({}),
});
