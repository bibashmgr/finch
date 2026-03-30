import { EmptyResponse } from "@/types/response";
import { apiSlice } from "@/store/slices/api-slice";
import { LoginWithEmailInput, VerifyEmailInput } from "@/types/auth";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginWithEmail: builder.mutation<EmptyResponse, LoginWithEmailInput>({
      query: (body) => ({
        url: "/auth/email",
        method: "POST",
        body,
      }),
    }),

    verifyEmail: builder.mutation<EmptyResponse, VerifyEmailInput>({
      query: (body) => ({
        url: "/auth/email/verify",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "Profile",
        "Setting",
        "DashboardSummary",
        "Report",
        "Categories",
        "Transactions",
        "Budgets",
        "Notifications",
      ],
    }),

    logoutUser: builder.mutation<EmptyResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginWithEmailMutation,
  useVerifyEmailMutation,
  useLogoutUserMutation,
} = authApi;
