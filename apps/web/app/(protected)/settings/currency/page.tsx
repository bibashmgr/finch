import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/stack-layout";
import { CurrencySettingForm } from "./currency-setting-form";

export const metadata: Metadata = {
  title: "Currency Setting - Finch",
};

export default function CurrencySettingPage() {
  return (
    <StackLayout pageTitle="Currency" fallbackUrl="/profile">
      <CurrencySettingForm />
    </StackLayout>
  );
}
