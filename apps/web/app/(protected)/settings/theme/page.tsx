import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/stack-layout";
import { ThemeSettingForm } from "./theme-setting-form";

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
