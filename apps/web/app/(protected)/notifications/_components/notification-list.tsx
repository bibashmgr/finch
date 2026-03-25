import React from "react";
import { BellIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/empty";

export function NotificationList() {
  return (
    <section className="flex flex-col">
      {/* {Array.from({ length: 5 }).map((_, index) => {
        return <NotificationItem key={index} />;
      })} */}
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BellIcon />
          </EmptyMedia>
          <EmptyTitle>No notifications found</EmptyTitle>
          <EmptyDescription>
            Looks like there aren&apos;t any notifications to show right now.
            Check back later.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </section>
  );
}
