"use client";

import React from "react";
import { format } from "date-fns";
import { PieChartIcon } from "lucide-react";
import { useParams } from "next/navigation";

import { cn } from "@repo/ui/lib/utils";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useGetBudgetByIdQuery } from "@/store/apis/budget-api";
import { getCurrencySymbol } from "@/utils/get-currency-symbol";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/empty";
import {
  CircularProgress,
  CircularProgressIndicator,
  CircularProgressTrack,
  CircularProgressRange,
  CircularProgressValueText,
} from "@repo/ui/components/circular-progress";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Card, CardContent } from "@repo/ui/components/card";

export function BudgetDetail() {
  const params = useParams<{ budgetId: string }>();
  const setting = useAppSelector((state) => state.setting.info);

  const {
    data: budget,
    isLoading,
    isSuccess,
  } = useGetBudgetByIdQuery(params.budgetId);

  const progress = React.useMemo(() => {
    if (!budget) {
      return 0;
    }

    const amountNum = Number(budget.amount);
    const spentNum = Number(budget.spent);

    if (spentNum > amountNum) {
      return 100;
    }

    return (spentNum / amountNum) * 100;
  }, [budget]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center py-6">
        <div className="flex flex-col gap-2 justify-center items-center">
          <Skeleton className="size-9" />
          <div className="flex flex-col gap-0.5 items-center">
            <Skeleton className="w-28 h-6" />
            <Skeleton className="w-20 h-5" />
          </div>
        </div>

        <Skeleton className="size-50 rounded-full" />

        <div className="grid grid-cols-2 gap-4 w-full">
          <Skeleton className="w-full h-25" />
          <Skeleton className="w-full h-25" />
        </div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PieChartIcon />
          </EmptyMedia>
          <EmptyTitle>Oops, budget didn&apos;t load</EmptyTitle>
          <EmptyDescription>
            We hit a snag while loading things. Please check your connection or
            try again.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center py-6">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div
          className="flex justify-center items-center size-9 rounded-lg border shadow-xs"
          style={{ backgroundColor: `${budget.category.color}20` }}
        >
          <span className="text-xs">{budget.category.icon}</span>
        </div>

        <div className="text-center space-y-0.5">
          <p className="text-base font-bold">{budget.category.title}</p>
          <p className="text-xs text-muted-foreground">
            {format(budget.month, "MMMM yyyy")}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <CircularProgress value={progress} size={200} thickness={8}>
          <CircularProgressIndicator>
            <CircularProgressTrack
              className={cn(
                "text-primary/20",
                progress >= 100 && "text-destructive/20",
              )}
            />
            <CircularProgressRange
              className={cn(
                "text-primary",
                progress >= 100 && "text-destructive",
              )}
            />
          </CircularProgressIndicator>
          <CircularProgressValueText className="text-2xl font-bold" />
        </CircularProgress>

        {progress >= 100 && (
          <p className="text-xs text-destructive text-center">
            (You&apos;ve exceed the limit)
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <Card>
          <CardContent className="space-y-1">
            <p className="text-xs text-muted-foreground">Spent Amount</p>
            <p className="text-xl font-bold">
              {getCurrencySymbol(setting?.currency)}
              {budget.spent}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-1">
            <p className="text-xs text-muted-foreground">Budget Amount</p>
            <p className="text-xl font-bold">
              {getCurrencySymbol(setting?.currency)}
              {budget.amount}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
