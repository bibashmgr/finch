import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Setting } from "@/types/setting";

type SettingState = {
  info: Setting | null;
  isLoading: boolean;
};

const initialState: SettingState = {
  info: null,
  isLoading: true,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSettingInfo: (state, action: PayloadAction<Setting | null>) => {
      state.info = action.payload;
    },
    setIsSettingLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setSettingInfo, setIsSettingLoading } = settingSlice.actions;

export default settingSlice.reducer;
