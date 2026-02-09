import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@/schemas/user";

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

      if (action.payload === null) {
        state.isLoading = true;
      } else {
        state.isLoading = false;
      }
    },
  },
});

export const { setProfileInfo } = profileSlice.actions;

export default profileSlice.reducer;
