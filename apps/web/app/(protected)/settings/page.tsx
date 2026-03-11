import React from "react";
import { Metadata } from "next";

import { SettingList } from "./setting-list";
import { StackLayout } from "@/components/stack-layout";

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
