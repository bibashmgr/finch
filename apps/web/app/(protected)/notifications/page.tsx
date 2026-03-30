import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/stack-layout";
import { NotificationList } from "./_components/notification-list";

export const metadata: Metadata = {
  title: "Notifications - Finch",
};

export default function NotificationsPage() {
  return (
    <StackLayout pageTitle="Notifications" fallbackUrl="/dashboard">
      <NotificationList />
      <div className="py-7" />
    </StackLayout>
  );
}
