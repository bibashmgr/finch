import { ReportRow } from "@/types/report";
import { apiSlice } from "@/store/slices/api-slice";

const reportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<ReportRow[], string | void>({
      query: (payload) => ({
        url: payload ? `/reports?${payload}` : `/reports`,
      }),
      providesTags: ["Report"],
    }),
  }),
});

export const { useGetReportsQuery, useLazyGetReportsQuery } = reportApi;
