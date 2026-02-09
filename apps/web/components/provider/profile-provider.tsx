"use client";

import React from "react";

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useGetProfileQuery } from "@/store/apis/user-api";
import {
  setIsProfileLoading,
  setProfileInfo,
} from "@/store/slices/profile-slice";

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isError } = useGetProfileQuery();

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
