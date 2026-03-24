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

type ReportDetailListProps = {
  period: string;
};

export function ReportDetailList({ period }: ReportDetailListProps) {
  const query = React.useMemo(() => {
    const now = new Date();

    if (period === "week") {
      const since = new Date(now);
      since.setDate(since.getDate() - 6);
      since.setHours(0, 0, 0, 0);

      const startDate = since.toISOString();
      const endDate = now.toISOString();
      return `startDate=${startDate}&endDate=${endDate}`;
    }

    if (period === "month") {
      const since = new Date(now);
      since.setMonth(since.getMonth() - 5);
      since.setDate(1);
      since.setHours(0, 0, 0, 0);

      const startDate = since.toISOString();
      const endDate = now.toISOString();
      return `startDate=${startDate}&endDate=${endDate}`;
    }

    if (period === "year") {
      const since = new Date(now);
      since.setFullYear(since.getFullYear() - 4);
      since.setMonth(0, 1);
      since.setHours(0, 0, 0, 0);

      const startDate = since.toISOString();
      const endDate = now.toISOString();
      return `startDate=${startDate}&endDate=${endDate}`;
    }

    return "";
  }, [period]);

  const { data, isLoading, isSuccess } = useGetTransactionsQuery(query);

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
          {Array.from({ length: 3 }).map((_, index) => {
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

        <Button variant="secondary" size="icon">
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
    </div>
  );
}
