import { apiSlice } from "@/store/slices/api-slice";
import {
  Setting,
  UpdateCurrencySettingInput,
  UpdateLanguageSettingInput,
  UpdateNotificationSettingInput,
  UpdateThemeSettingInput,
} from "@/types/setting";

const settingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMySetting: builder.query<Setting, void>({
      query: () => ({
        url: "/settings",
      }),
      providesTags: ["Setting"],
    }),

    updateCurrencySetting: builder.mutation<
      Setting,
      UpdateCurrencySettingInput
    >({
      query: (body) => ({
        url: "/settings/currency",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Setting"],
    }),

    updateLanguageSetting: builder.mutation<
      Setting,
      UpdateLanguageSettingInput
    >({
      query: (body) => ({
        url: "/settings/language",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Setting"],
    }),

    updateThemeSetting: builder.mutation<Setting, UpdateThemeSettingInput>({
      query: (body) => ({
        url: "/settings/theme",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Setting"],
    }),

    updateNotificationSetting: builder.mutation<
      Setting,
      UpdateNotificationSettingInput
    >({
      query: (body) => ({
        url: "/settings/notification",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Setting"],
    }),
  }),
});

export const {
  useGetMySettingQuery,
  useLazyGetMySettingQuery,
  useUpdateCurrencySettingMutation,
  useUpdateLanguageSettingMutation,
  useUpdateThemeSettingMutation,
  useUpdateNotificationSettingMutation,
} = settingApi;
