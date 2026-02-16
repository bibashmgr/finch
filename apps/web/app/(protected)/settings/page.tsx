import React from "react";
import { Metadata } from "next";

import { SettingItem } from "@/components/setting/setting-item";
import { StackLayout } from "@/components/layout/stack-layout";

export const metadata: Metadata = {
  title: "Settings - Finch",
};

export default function SettingsPage() {
  return (
    <StackLayout pageTitle="Settings" fallbackUrl="/profile">
      <section className="flex flex-col">
        <SettingItem title="Currency" href="/settings/currency" value="USD" />
        <SettingItem
          title="Language"
          href="/settings/language"
          value="English"
        />
        <SettingItem title="Theme" href="/settings/theme" value="Dark" />
        <SettingItem title="Notification" href="/settings/notification" />
      </section>
    </StackLayout>
  );
}
