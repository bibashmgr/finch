"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { endOfMonth, format, parseISO, startOfMonth } from "date-fns";

import { TransactionWithCategory } from "@/types/transaction";
import { useGetTransactionsQuery } from "@/store/apis/transaction-api";

import { TransactionCard } from "@/components/transaction-card";
import { Skeleton } from "@repo/ui/components/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/empty";
import { ArrowRightLeftIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";

type GroupedTransactions = Record<string, TransactionWithCategory[]>;

export function TransactionList() {
  const searchParams = useSearchParams();

  const query = React.useMemo(() => {
    const type = searchParams.get("type");
    const startDate =
      searchParams.get("startDate") ?? startOfMonth(new Date()).toISOString();
    const endDate =
      searchParams.get("endDate") ?? endOfMonth(new Date()).toISOString();
    const sortBy = searchParams.get("sortBy") ?? "issuedAt:desc";

    const params = new URLSearchParams();

    if (type) params.append("type", type);
    params.append("startDate", startDate);
    params.append("endDate", endDate);
    params.append("sortBy", sortBy);

    return params.toString();
  }, [searchParams]);

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
  }, [data?.results]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <div key={index} className="space-y-4">
              <Skeleton className="w-28 h-6" />
              <div className="space-y-3">
                <Skeleton className="w-full h-18" />
                <Skeleton className="w-full h-18" />
              </div>
            </div>
          );
        })}
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

  if (data.results.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ArrowRightLeftIcon />
          </EmptyMedia>
          <EmptyTitle>No transactions found</EmptyTitle>
          <EmptyDescription>
            Looks like there aren&apos;t any transactions to show right now. Try
            adding one or change filters.
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
    );
  }

  return (
    <section className="space-y-6">
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
    </section>
  );
}
