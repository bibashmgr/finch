import { Asset } from "@/types/asset";
import { apiSlice } from "@/store/slices/api-slice";

const assetApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadAsset: builder.mutation<Asset, FormData>({
      query: (body) => ({
        url: "/assets/upload",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useUploadAssetMutation } = assetApi;
