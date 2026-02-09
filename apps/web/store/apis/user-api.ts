import { User } from "@/schemas/user";
import { apiSlice } from "@/store/slices/api-slice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => ({
        url: "/users/me",
      }),
      providesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useLazyGetProfileQuery } = userApi;
