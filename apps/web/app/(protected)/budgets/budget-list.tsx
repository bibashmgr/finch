"use client";

import React from "react";
import Link from "next/link";
import { addMonths, format, subMonths } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon, PieChartIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/empty";
import { Button } from "@repo/ui/components/button";
import { BudgetCard } from "@/components/budget-card";
import { Skeleton } from "@repo/ui/components/skeleton";
import { useGetBudgetsQuery } from "@/store/apis/budget-api";

export function BudgetList() {
  const [selectedMonth, setSelectedMonth] = React.useState<Date>(new Date());

  const parsedMonth = React.useMemo(() => {
    const parsed = selectedMonth;
    parsed.setDate(1);
    parsed.setHours(0, 0, 0, 0);
    return format(selectedMonth, "yyyy-MM-dd");
  }, [selectedMonth]);

  const { data, isLoading, isFetching, isSuccess } = useGetBudgetsQuery(
    `month=${parsedMonth}`,
  );

  const handleChangeMonth = React.useCallback(
    (action: "increase" | "decrease") => {
      if (action === "increase") {
        setSelectedMonth((prev) => addMonths(prev, 1));
      } else {
        setSelectedMonth((prev) => subMonths(prev, 1));
      }
    },
    [],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between gap-2 items-center border-b py-4 px-4 sticky top-0 z-10 bg-background">
        <Button
          variant="ghost"
          size="icon"
          disabled={isLoading}
          onClick={() => handleChangeMonth("decrease")}
        >
          <ChevronLeftIcon />
        </Button>

        <p className="text-lg font-bold">
          {format(selectedMonth, "MMMM yyyy")}
        </p>

        <Button
          variant="ghost"
          size="icon"
          disabled={isLoading}
          onClick={() => handleChangeMonth("increase")}
        >
          <ChevronRightIcon />
        </Button>
      </div>

      {isFetching ? (
        <div className="space-y-4">
          <div className="flex flex-row gap-2 justify-between items-center">
            <Skeleton className="w-20 h-9" />
            <Skeleton className="w-20 h-9" />
          </div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-25" />
            ))}
          </div>
        </div>
      ) : !isSuccess ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PieChartIcon />
            </EmptyMedia>
            <EmptyTitle>Oops, budgets didn&apos;t load</EmptyTitle>
            <EmptyDescription>
              We hit a snag while loading things. Please check your connection
              or try again.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : data.results.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PieChartIcon />
            </EmptyMedia>
            <EmptyTitle>No budgets found</EmptyTitle>
            <EmptyDescription>
              Looks like there aren&apos;t any budgets to show for this month.
              Try creating one.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/budgets/create">
              <Button variant="outline" className="cursor-pointer">
                Add budget
              </Button>
            </Link>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-row gap-2 justify-between items-center">
            <p className="text-lg font-bold">Budgets</p>
            <Link href="/budgets/create">
              <Button size="sm" variant="outline">
                Add
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {data.results.map((budget) => {
              return (
                <Link key={budget.id} href={`/budgets/${budget.id}/edit`}>
                  <BudgetCard budget={budget} />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
