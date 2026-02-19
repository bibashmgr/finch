import React from "react";

import { NotificationItem } from "@/components/notification/notification-item";

export function NotificationList() {
  return (
    <section className="flex flex-col">
      {Array.from({ length: 5 }).map((_, index) => {
        return <NotificationItem key={index} />;
      })}
    </section>
  );
}
