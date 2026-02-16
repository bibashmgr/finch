import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/layout/stack-layout";
import { LanguageSettingForm } from "@/components/setting/language-setting-form";

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
