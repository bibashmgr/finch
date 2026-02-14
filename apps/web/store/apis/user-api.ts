import { apiSlice } from "@/store/slices/api-slice";
import { UpdateUserInput, User } from "@/types/user";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<User, void>({
      query: () => ({
        url: "/users/me",
      }),
      providesTags: ["Profile"],
    }),

    updateMyProfile: builder.mutation<User, UpdateUserInput>({
      query: (body) => ({
        url: "/users/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useLazyGetMyProfileQuery,
  useUpdateMyProfileMutation,
} = userApi;
