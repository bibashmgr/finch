"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightLeftIcon, ArrowUpDownIcon } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/empty";
import { Button } from "@repo/ui/components/button";
import { Skeleton } from "@repo/ui/components/skeleton";
import { TransactionCard } from "@/components/transaction-card";

import { useGetTransactionsQuery } from "@/store/apis/transaction-api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/components/pagination";
import { cn } from "@repo/ui/lib/utils";
import { QueryOptions } from "./report-detail";
import { ReportDetailSortDrawer } from "./report-detail-sort-drawer";

type ReportDetailListProps = {
  queryOptions: QueryOptions;
  handleChangeQueryOptions: (value: Partial<QueryOptions>) => void;
};

export function ReportDetailList({
  queryOptions,
  handleChangeQueryOptions,
}: ReportDetailListProps) {
  const [isSortDrawerOpen, setIsSortDrawerOpen] =
    React.useState<boolean>(false);

  const query = React.useMemo(() => {
    const params = new URLSearchParams();

    params.set("page", String(queryOptions.page));
    params.set("limit", String(queryOptions.limit));

    const now = new Date();

    if (queryOptions.period === "week") {
      const since = new Date(now);
      since.setDate(since.getDate() - 6);
      since.setHours(0, 0, 0, 0);

      params.set("startDate", since.toISOString());
      params.set("endDate", now.toISOString());
    }

    if (queryOptions.period === "month") {
      const since = new Date(now);
      since.setMonth(since.getMonth() - 5);
      since.setDate(1);
      since.setHours(0, 0, 0, 0);

      params.set("startDate", since.toISOString());
      params.set("endDate", now.toISOString());
    }

    if (queryOptions.period === "year") {
      const since = new Date(now);
      since.setFullYear(since.getFullYear() - 4);
      since.setMonth(0, 1);
      since.setHours(0, 0, 0, 0);

      params.set("startDate", since.toISOString());
      params.set("endDate", now.toISOString());
    }

    if (queryOptions.sortBy === "newest") {
      params.set("sortBy", "issuedAt:desc,createdAt:desc");
    }

    if (queryOptions.sortBy === "oldest") {
      params.set("sortBy", "issuedAt:asc,createdAt:asc");
    }

    if (queryOptions.sortBy === "highest") {
      params.set("sortBy", "amount:desc,createdAt:desc");
    }

    if (queryOptions.sortBy === "lowest") {
      params.set("sortBy", "amount:asc,createdAt:desc");
    }

    return params.toString();
  }, [queryOptions]);

  const { data, isLoading, isSuccess } = useGetTransactionsQuery(query);

  const handlePagination = React.useCallback(
    (action: "next" | "previous") => {
      if (action === "next") {
        handleChangeQueryOptions({
          page: queryOptions.page + 1,
        });
      } else {
        handleChangeQueryOptions({
          page: queryOptions.page - 1,
        });
      }
    },
    [queryOptions],
  );

  const handleChangeSortDrawer = React.useCallback((value: boolean) => {
    setIsSortDrawerOpen(value);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2 justify-between items-center">
          <p className="text-base font-bold">Transactions</p>

          <Button variant="secondary" size="icon" disabled>
            <ArrowUpDownIcon />
          </Button>
        </div>

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => {
            return <Skeleton key={index} className="w-full h-18" />;
          })}
        </div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2 justify-between items-center">
          <p className="text-base font-bold">Transactions</p>

          <Button variant="secondary" size="icon" disabled>
            <ArrowUpDownIcon />
          </Button>
        </div>

        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ArrowRightLeftIcon />
            </EmptyMedia>
            <EmptyTitle>Oops, transactions didn&apos;t load</EmptyTitle>
            <EmptyDescription>
              We hit a snag while loading things. Please check your connection
              or try again.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  if (data.results.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2 justify-between items-center">
          <p className="text-base font-bold">Transactions</p>

          <Button variant="secondary" size="icon" disabled>
            <ArrowUpDownIcon />
          </Button>
        </div>

        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ArrowRightLeftIcon />
            </EmptyMedia>
            <EmptyTitle>No transactions found</EmptyTitle>
            <EmptyDescription>
              Looks like there aren&apos;t any transactions to show right now.
              Try adding one or change filters.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-between items-center">
        <p className="text-base font-bold">Transactions</p>

        <Button
          variant="secondary"
          size="icon"
          onClick={() => handleChangeSortDrawer(true)}
        >
          <ArrowUpDownIcon />
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {data.results.map((transaction) => {
          return (
            <Link
              key={transaction.id}
              href={`/transactions/${transaction.id}`}
              prefetch={false}
            >
              <TransactionCard transaction={transaction} showDate />
            </Link>
          );
        })}
      </div>

      {data.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={queryOptions.page === 1}
                className={cn(
                  "cursor-pointer",
                  queryOptions.page === 1 && "pointer-events-none opacity-50",
                )}
                onClick={() => handlePagination("previous")}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                aria-disabled={queryOptions.page === data.totalPages}
                className={cn(
                  "cursor-pointer",
                  queryOptions.page === data.totalPages &&
                    "pointer-events-none opacity-50",
                )}
                onClick={() => handlePagination("next")}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <ReportDetailSortDrawer
        queryOptions={queryOptions}
        handleChangeQueryOptions={handleChangeQueryOptions}
        isDrawerOpen={isSortDrawerOpen}
        handleChangeDrawer={handleChangeSortDrawer}
      />
    </div>
  );
}
