"use client";

import {
  ArrowRightLeftIcon,
  ChevronRightIcon,
  FileChartLineIcon,
  FilterIcon,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { endOfMonth, format, parseISO, startOfMonth } from "date-fns";

import { cn } from "@repo/ui/lib/utils";
import { TransactionWithCategory } from "@/types/transaction";
import { useGetTransactionsQuery } from "@/store/apis/transaction-api";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/item";
import {
  Empty,
  EmptyContent,
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
import { Button } from "@repo/ui/components/button";
import { Skeleton } from "@repo/ui/components/skeleton";
import { TransactionCard } from "@/components/transaction-card";
import { TransactionFilterDrawer } from "./transaction-filter-drawer";

export type QueryOptions = {
  page: number;
  limit: number;
  type: string;
  date: Date;
  sortBy: string;
};

type GroupedTransactions = Record<string, TransactionWithCategory[]>;

export function TransactionList() {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] =
    React.useState<boolean>(false);
  const [queryOptions, setQueryOptions] = React.useState<QueryOptions>({
    page: 1,
    limit: 10,
    type: "",
    date: new Date(),
    sortBy: "newest",
  });

  const query = React.useMemo(() => {
    const params = new URLSearchParams();

    params.set("page", String(queryOptions.page));
    params.set("limit", String(queryOptions.limit));

    if (queryOptions.type.length > 0) {
      params.set("type", queryOptions.type);
    }

    if (queryOptions.sortBy === "newest") {
      params.set("sortBy", "issuedAt:desc,createdAt:desc");
    }

    if (queryOptions.sortBy === "oldest") {
      params.set("sortBy", "issuedAt:asc,createdAt:asc");
    }

    const start = startOfMonth(queryOptions.date);
    const end = endOfMonth(queryOptions.date);
    params.set("startDate", start.toISOString());
    params.set("endDate", end.toISOString());

    return params.toString();
  }, [queryOptions]);

  const { data, isLoading, isSuccess } = useGetTransactionsQuery(query);

  const groupedTransactions = React.useMemo(() => {
    if (!data) {
      return {};
    }

    return data.results.reduce((acc, tx) => {
      const date = parseISO(tx.issuedAt);
      const dateKey = format(date, "yyyy-MM-dd");

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(tx);

      return acc;
    }, {} as GroupedTransactions);
  }, [data]);

  const handleChangeQueryOptions = React.useCallback((value: QueryOptions) => {
    setQueryOptions((prev) => ({
      ...prev,
      ...value,
    }));
  }, []);

  const handlePagination = React.useCallback((action: "next" | "previous") => {
    if (action === "next") {
      setQueryOptions((prev) => ({ ...prev, page: prev.page + 1 }));
    } else {
      setQueryOptions((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  }, []);

  const handleChangeFilterDrawer = React.useCallback((value: boolean) => {
    setIsFilterDrawerOpen(value);
  }, []);

  if (isLoading) {
    return (
      <div>
        <div className="space-y-4 py-4">
          <div className="flex flex-row gap-2 justify-between items-center">
            <Skeleton className="w-20 h-9" />
            <Skeleton className="size-9" />
          </div>

          <Skeleton className="w-full h-12" />
        </div>

        <div className="space-y-6">
          {Array.from({ length: 2 }).map((_, index) => {
            return (
              <div key={index} className="space-y-4">
                <Skeleton className="w-28 h-6" />
                <div className="space-y-3">
                  <Skeleton className="w-full h-18" />
                  <Skeleton className="w-full h-18" />
                  <Skeleton className="w-full h-18" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ArrowRightLeftIcon />
          </EmptyMedia>
          <EmptyTitle>Oops, transactions didn&apos;t load</EmptyTitle>
          <EmptyDescription>
            We hit a snag while loading things. Please check your connection or
            try again.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div>
      <section className="sticky top-0 z-10 space-y-4 py-4 bg-background">
        <div className="flex flex-row gap-2 justify-between items-center">
          <h2 className="font-bold text-lg">
            {format(queryOptions.date, "MMMM, yyyy")}
          </h2>

          <Button
            size="icon"
            variant="secondary"
            className="cursor-pointer"
            onClick={() => handleChangeFilterDrawer(true)}
          >
            <FilterIcon className="size-4" />
          </Button>
        </div>

        <Item variant="outline" size="sm" asChild>
          <Link href="/report" prefetch={false}>
            <ItemMedia>
              <FileChartLineIcon className="size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>See your financial report</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4" />
            </ItemActions>
          </Link>
        </Item>
      </section>

      <section className="space-y-6">
        {data.results.length === 0 ? (
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
            <EmptyContent>
              <Link href="/transactions/create">
                <Button variant="outline" className="cursor-pointer">
                  Add transactions
                </Button>
              </Link>
            </EmptyContent>
          </Empty>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTransactions).map(([date, list]) => {
              return (
                <div key={date} className="space-y-4">
                  <p className="text-base font-bold">
                    {format(date, "dd MMM, yyyy")}
                  </p>

                  <div className="flex flex-col gap-3">
                    {list.map((transaction) => {
                      return (
                        <Link
                          key={transaction.id}
                          href={`/transactions/${transaction.id}`}
                          prefetch={false}
                        >
                          <TransactionCard transaction={transaction} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
      </section>

      <TransactionFilterDrawer
        queryOptions={{
          type: queryOptions.type,
          date: queryOptions.date,
          sortBy: queryOptions.sortBy,
        }}
        handleChangeQueryOptions={handleChangeQueryOptions}
        isDrawerOpen={isFilterDrawerOpen}
        handleChangeDrawer={handleChangeFilterDrawer}
      />
    </div>
  );
}
