import { apiSlice } from "@/store/slices/api-slice";
import { DashboardSummary } from "@/types/dashboard";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<DashboardSummary, void>({
      query: () => "/dashboard/summary",
      providesTags: ["DashboardSummary"],
    }),
  }),
});

export const { useGetDashboardSummaryQuery, useLazyGetDashboardSummaryQuery } =
  dashboardApi;
