"use client";

import React from "react";
import { BanknoteArrowDownIcon, BanknoteArrowUpIcon } from "lucide-react";

import { Card, CardContent } from "@repo/ui/components/card";
import { useGetDashboardSummaryQuery } from "@/store/apis/dashboard-api";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getCurrencySymbol } from "@/utils/get-currency-symbol";
import { Skeleton } from "@repo/ui/components/skeleton";

export function DashboardStats() {
  const setting = useAppSelector((state) => state.setting.info);
  const { data, isLoading, isSuccess } = useGetDashboardSummaryQuery();

  const totalBalance = React.useMemo(() => {
    const currencySymbol = getCurrencySymbol(setting?.currency);

    if (!data) {
      return `${currencySymbol}0`;
    }

    const balance = data.totalIncome - data.totalExpense;

    if (balance >= 0) {
      return `${currencySymbol}${balance}`;
    }

    return `- ${currencySymbol}${balance.toString().slice(1)}`;
  }, [data, setting?.currency]);

  if (isLoading) {
    return <Skeleton className="w-full h-40" />;
  }

  if (!isSuccess) {
    return (
      <Card className="py-4">
        <CardContent className="space-y-6 px-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <h2 className="text-3xl font-bold">N/A</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2 items-center">
              <div className="size-10 hidden sm:flex justify-center items-center rounded-md bg-teal-500">
                <BanknoteArrowUpIcon className="size-5 text-white" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Income</p>
                <h4 className="text-lg font-bold">N/A</h4>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div className="size-10 hidden sm:flex justify-center items-center rounded-md bg-destructive">
                <BanknoteArrowDownIcon className="size-5 text-white" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Expense</p>
                <h4 className="text-lg font-bold">N/A</h4>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="py-4">
      <CardContent className="space-y-6 px-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Total Balance</p>
          <h2 className="text-3xl font-bold">{totalBalance}</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex gap-2 items-center">
            <div className="size-10 hidden sm:flex justify-center items-center rounded-md bg-teal-500">
              <BanknoteArrowUpIcon className="size-5 text-white" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Income</p>
              <h4 className="text-lg font-bold">
                {getCurrencySymbol(setting?.currency)}
                {data.totalIncome}
              </h4>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="size-10 hidden sm:flex justify-center items-center rounded-md bg-destructive">
              <BanknoteArrowDownIcon className="size-5 text-white" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Expense</p>
              <h4 className="text-lg font-bold">
                {getCurrencySymbol(setting?.currency)}
                {data.totalExpense}
              </h4>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
