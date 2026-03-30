"use client";

import React from "react";
import { BellIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/empty";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/components/pagination";
import { NotificationItem } from "@/components/notification-item";

import { cn } from "@repo/ui/lib/utils";
import { useGetNotificationsQuery } from "@/store/apis/notification-api";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Spinner } from "@repo/ui/components/spinner";

export function NotificationList() {
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isSuccess } = useGetNotificationsQuery(
    `limit=${pagination.limit}&page=${pagination.page}`,
  );

  if (isLoading) {
    return (
      <div className="w-full h-20 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BellIcon />
          </EmptyMedia>
          <EmptyTitle>Oops, notifications didn&apos;t load</EmptyTitle>
          <EmptyDescription>
            We hit a snag while loading things. Please check your connection or
            try again.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  if (data.results.length === 0) {
    return (
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
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <div>
        {data.results.map((notification) => {
          return (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          );
        })}
      </div>

      {data.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={pagination.page === 1}
                className={cn(
                  "cursor-pointer",
                  pagination.page === 1 && "pointer-events-none opacity-50",
                )}
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                aria-disabled={pagination.page === data.totalPages}
                className={cn(
                  "cursor-pointer",
                  pagination.page === data.totalPages &&
                    "pointer-events-none opacity-50",
                )}
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}
