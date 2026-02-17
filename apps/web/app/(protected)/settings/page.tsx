import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/layout/stack-layout";
import { SettingList } from "@/components/setting/setting-list";

export const metadata: Metadata = {
  title: "Settings - Finch",
};

export default function SettingsPage() {
  return (
    <StackLayout pageTitle="Settings" fallbackUrl="/profile">
      <SettingList />
    </StackLayout>
  );
}
