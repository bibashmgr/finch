import {
  TransactionCreateInput,
  TransactionUpdateInput,
  TransactionWithAttachment,
  TransactionWithCategory,
  TransactionWithDetails,
} from "@/types/transaction";
import { apiSlice } from "@/store/slices/api-slice";
import { PaginatedResponse } from "@/types/response";

const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<
      PaginatedResponse<TransactionWithCategory>,
      string | void
    >({
      query: (payload) => ({
        url: payload ? `/transactions?${payload}` : `/transactions`,
      }),
      providesTags: (response) =>
        response
          ? [
              ...response.results.map(({ id }) => ({
                type: "Transactions" as const,
                id,
              })),
              { type: "Transactions", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Transactions", id: "PARTIAL-LIST" }],
    }),

    createTransaction: builder.mutation<
      TransactionWithAttachment,
      TransactionCreateInput
    >({
      query: (body) => ({
        url: "/transactions",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Transactions", id: "PARTIAL-LIST" }],
    }),

    getTransactionById: builder.query<TransactionWithDetails, string>({
      query: (id) => `/transactions/${id}`,
      providesTags: (response) => [
        { type: "Transactions", id: response?.id },
        { type: "Transactions", id: "PARTIAL-LIST" },
      ],
    }),

    updateTransaction: builder.mutation<
      TransactionWithAttachment,
      TransactionUpdateInput
    >({
      query: (payload) => ({
        url: `/transactions/${payload.id}`,
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: (response) => [
        { type: "Transactions", id: response?.id },
        { type: "Transactions", id: "PARTIAL-LIST" },
      ],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useLazyGetTransactionsQuery,
  useCreateTransactionMutation,
  useGetTransactionByIdQuery,
  useLazyGetTransactionByIdQuery,
  useUpdateTransactionMutation,
} = transactionApi;
