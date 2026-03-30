import { Notification } from "@/types/notification";
import { apiSlice } from "@/store/slices/api-slice";
import { PaginatedResponse } from "@/types/response";

const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      PaginatedResponse<Notification>,
      string | void
    >({
      query: (payload) => ({
        url: payload ? `/notifications?${payload}` : `/notifications`,
      }),
      providesTags: (response) =>
        response
          ? [
              ...response.results.map(({ id }) => ({
                type: "Notifications" as const,
                id,
              })),
              { type: "Notifications", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Notifications", id: "PARTIAL-LIST" }],
    }),

    markAllAsRead: builder.mutation<Notification, void>({
      query: () => ({
        url: `/notifications/read`,
        method: "POST",
      }),
      invalidatesTags: () => [{ type: "Notifications", id: "PARTIAL-LIST" }],
    }),

    markOneAsRead: builder.mutation<Notification, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "POST",
      }),
      invalidatesTags: (response) => [
        { type: "Notifications", id: response?.id },
        { type: "Notifications", id: "PARTIAL-LIST" },
      ],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkOneAsReadMutation,
} = notificationApi;
