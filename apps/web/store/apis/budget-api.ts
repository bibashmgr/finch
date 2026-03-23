import {
  Budget,
  BudgetCreateInput,
  BudgetUpdateInput,
  BudgetWithCategoryAndSpent,
} from "@/types/budget";
import { apiSlice } from "@/store/slices/api-slice";
import { PaginatedResponse } from "@/types/response";

const budgetApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBudgets: builder.query<
      PaginatedResponse<BudgetWithCategoryAndSpent>,
      string | void
    >({
      query: (payload) => ({
        url: payload ? `/budgets?${payload}` : `/budgets`,
      }),
      providesTags: (response) =>
        response
          ? [
              ...response.results.map(({ id }) => ({
                type: "Budgets" as const,
                id,
              })),
              { type: "Budgets", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Budgets", id: "PARTIAL-LIST" }],
    }),

    createBudget: builder.mutation<Budget, BudgetCreateInput>({
      query: (body) => ({
        url: "/budgets",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Budgets", id: "PARTIAL-LIST" }],
    }),

    getBudgetById: builder.query<BudgetWithCategoryAndSpent, string>({
      query: (id) => `/budgets/${id}`,
      providesTags: (response) => [
        { type: "Budgets", id: response?.id },
        { type: "Budgets", id: "PARTIAL-LIST" },
      ],
    }),

    updateBudget: builder.mutation<Budget, BudgetUpdateInput>({
      query: (payload) => ({
        url: `/budgets/${payload.id}`,
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: (response) => [
        { type: "Budgets", id: response?.id },
        { type: "Budgets", id: "PARTIAL-LIST" },
      ],
    }),
  }),
});

export const {
  useGetBudgetsQuery,
  useLazyGetBudgetsQuery,
  useCreateBudgetMutation,
  useGetBudgetByIdQuery,
  useLazyGetBudgetByIdQuery,
  useUpdateBudgetMutation,
} = budgetApi;
