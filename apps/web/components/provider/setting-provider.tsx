"use client";

import React from "react";

import {
  setIsSettingLoading,
  setSettingInfo,
} from "@/store/slices/setting-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useGetMySettingQuery } from "@/store/apis/setting-api";

export function SettingProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isError } = useGetMySettingQuery();

  React.useEffect(() => {
    if (data && isSuccess) {
      dispatch(setSettingInfo(data));
      dispatch(setIsSettingLoading(false));
    }

    if (isError) {
      dispatch(setSettingInfo(null));
      dispatch(setIsSettingLoading(false));
    }
  }, [data, isSuccess, isError, dispatch]);

  return <>{children}</>;
}
