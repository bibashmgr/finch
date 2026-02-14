import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@/types/user";

type ProfileState = {
  info: User | null;
  isLoading: boolean;
};

const initialState: ProfileState = {
  info: null,
  isLoading: true,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileInfo: (state, action: PayloadAction<User | null>) => {
      state.info = action.payload;
    },
    setIsProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setProfileInfo, setIsProfileLoading } = profileSlice.actions;

export default profileSlice.reducer;
