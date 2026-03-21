"use client";

import React from "react";
import Link from "next/link";
import { endOfMonth, startOfMonth } from "date-fns";

import { TransactionCard } from "@/components/transaction-card";
import { useGetTransactionsQuery } from "@/store/apis/transaction-api";
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

export function RecentTransactionList() {
  const { data, isLoading, isSuccess } = useGetTransactionsQuery(
    `startDate=${startOfMonth(new Date()).toISOString()}&endDate=${endOfMonth(new Date()).toISOString()}`,
  );

  if (isLoading) {
    return (
      <section className="space-y-4">
        <div className="flex gap-2 justify-between items-center">
          <p className="text-base font-bold">Recent Transactions</p>

          <Link href="/transactions" prefetch={false}>
            <p className="text-base text-muted-foreground hover:underline">
              See all
            </p>
          </Link>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, index) => {
            return <Skeleton key={index} className="w-full h-18" />;
          })}
        </div>
      </section>
    );
  }

  if (!isSuccess) {
    return (
      <section className="space-y-4">
        <div className="flex gap-2 justify-between items-center">
          <p className="text-base font-bold">Recent Transactions</p>

          <Link href="/transactions" prefetch={false}>
            <p className="text-base text-muted-foreground hover:underline">
              See all
            </p>
          </Link>
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
      </section>
    );
  }

  if (data.results.length === 0) {
    return (
      <section className="space-y-4">
        <div className="flex gap-2 justify-between items-center">
          <p className="text-base font-bold">Recent Transactions</p>

          <Link href="/transactions" prefetch={false}>
            <p className="text-base text-muted-foreground hover:underline">
              See all
            </p>
          </Link>
        </div>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ArrowRightLeftIcon />
            </EmptyMedia>
            <EmptyTitle>No transactions found</EmptyTitle>
            <EmptyDescription>
              Looks like there aren&apos;t any transactions for curreny month to
              show right now. Try adding one or change filters.
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
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex gap-2 justify-between items-center">
        <p className="text-base font-bold">Recent Transactions</p>

        <Link href="/transactions" prefetch={false}>
          <p className="text-base text-muted-foreground hover:underline">
            See all
          </p>
        </Link>
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
    </section>
  );
}
