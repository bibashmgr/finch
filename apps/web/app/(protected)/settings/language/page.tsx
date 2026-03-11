import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/stack-layout";
import { LanguageSettingForm } from "./language-setting-form";

export const metadata: Metadata = {
  title: "Language Setting - Finch",
};

export default function LanguageSettingPage() {
  return (
    <StackLayout pageTitle="Language" fallbackUrl="/profile">
      <LanguageSettingForm />
    </StackLayout>
  );
}
