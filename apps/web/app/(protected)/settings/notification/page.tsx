import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/layout/stack-layout";
import { NotificationSettingForm } from "@/components/setting/notification-setting-form";

export const metadata: Metadata = {
  title: "Notification Setting - Finch",
};

export default function NotificationSettingPage() {
  return (
    <StackLayout pageTitle="Notification" fallbackUrl="/profile">
      <NotificationSettingForm />
    </StackLayout>
  );
}
