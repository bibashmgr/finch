import {
  Category,
  CategoryCreateInput,
  CategoryUpdateInput,
} from "@/types/category";
import { apiSlice } from "@/store/slices/api-slice";
import { PaginatedResponse } from "@/types/response";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<PaginatedResponse<Category>, string | void>({
      query: (payload) => ({
        url: payload ? `/categories?${payload}` : `/categories`,
      }),
      providesTags: (response) =>
        response
          ? [
              ...response.results.map(({ id }) => ({
                type: "Categories" as const,
                id,
              })),
              { type: "Categories", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Categories", id: "PARTIAL-LIST" }],
    }),

    createCategory: builder.mutation<Category, CategoryCreateInput>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Categories", id: "PARTIAL-LIST" }],
    }),

    getCategoryById: builder.query<Category, string>({
      query: (id) => `/categories/${id}`,
      providesTags: (response) => [
        { type: "Categories", id: response?.id },
        { type: "Categories", id: "PARTIAL-LIST" },
      ],
    }),

    updateCategory: builder.mutation<Category, CategoryUpdateInput>({
      query: (payload) => ({
        url: `/categories/${payload.id}`,
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: (response) => [
        { type: "Categories", id: response?.id },
        { type: "Categories", id: "PARTIAL-LIST" },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
  useLazyGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = categoryApi;
