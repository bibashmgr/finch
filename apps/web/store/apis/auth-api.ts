import { EmptyResponse } from "@/schemas/response";
import { apiSlice } from "@/store/slices/api-slice";
import { LoginWithEmailInput, VerifyEmailInput } from "@/schemas/auth";

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
