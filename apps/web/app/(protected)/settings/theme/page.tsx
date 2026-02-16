import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/layout/stack-layout";
import { ThemeSettingForm } from "@/components/setting/theme-setting-form";

export const metadata: Metadata = {
  title: "Theme Setting - Finch",
};

export default function ThemeSettingPage() {
  return (
    <StackLayout pageTitle="Theme" fallbackUrl="/profile">
      <ThemeSettingForm />
    </StackLayout>
  );
}
