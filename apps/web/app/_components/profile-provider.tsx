"use client";

import React from "react";

import {
  setIsProfileLoading,
  setProfileInfo,
} from "@/store/slices/profile-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useGetMyProfileQuery } from "@/store/apis/user-api";

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isError } = useGetMyProfileQuery();

  React.useEffect(() => {
    if (data && isSuccess) {
      dispatch(setProfileInfo(data));
      dispatch(setIsProfileLoading(false));
    }

    if (isError) {
      dispatch(setProfileInfo(null));
      dispatch(setIsProfileLoading(false));
    }
  }, [data, isSuccess, isError, dispatch]);

  return <>{children}</>;
}
