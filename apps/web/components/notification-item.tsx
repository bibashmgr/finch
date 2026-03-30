"use client";

import React from "react";
import { ChartPie, InfoIcon } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

import { cn } from "@repo/ui/lib/utils";
import { Notification, NotificationTypeEnum } from "@/types/notification";
import { useMarkOneAsReadMutation } from "@/store/apis/notification-api";

type NotificationItemProps = {
  notification: Notification;
};

export function NotificationItem({ notification }: NotificationItemProps) {
  const [markAsRead] = useMarkOneAsReadMutation();

  async function handleMarkAsRead() {
    try {
      if (notification.readAt) return;
      await markAsRead(notification.id).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  function getIcon(type: NotificationTypeEnum) {
    switch (type) {
      case NotificationTypeEnum.BUDGET_EXCEEDED:
        return (
          <div className="size-10 flex justify-center items-center bg-destructive rounded-md shrink-0">
            <ChartPie className="size-4 text-white" />
          </div>
        );

      default:
        <div className="size-10 flex justify-center items-center bg-primary rounded-md shrink-0">
          <InfoIcon className="size-4 text-white" />
        </div>;
    }
  }

  return (
    <div
      className={cn(
        "flex justify-between gap-4 border-b py-3 px-3 cursor-pointer",
        notification.readAt === null && "bg-zinc-100 dark:bg-zinc-900",
      )}
      onClick={handleMarkAsRead}
    >
      <div className="flex gap-3 flex-1">
        {getIcon(notification.type)}

        <div>
          <p className="text-sm line-clamp-1 font-semibold">
            {notification.title}
          </p>
          <p className="text-sm line-clamp-2 text-muted-foreground">
            {notification.body}
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-nowrap">
        {formatDistanceToNowStrict(notification.createdAt)}
      </p>
    </div>
  );
}
