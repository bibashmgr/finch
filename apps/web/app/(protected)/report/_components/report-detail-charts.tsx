"use client";

import React from "react";
import { ChartLineIcon } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/chart";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/empty";
import { Skeleton } from "@repo/ui/components/skeleton";

import { useGetReportsQuery } from "@/store/apis/report-api";

const chartConfig = {
  expense: {
    label: "Expense",
    color: "oklch(70.4% 0.191 22.216)",
  },
  income: {
    label: "Income",
    color: "oklch(77.7% 0.152 181.912)",
  },
} satisfies ChartConfig;

type ReportDetailChartsProps = {
  period: string;
};

export function ReportDetailCharts({ period }: ReportDetailChartsProps) {
  const { data, isLoading, isSuccess } = useGetReportsQuery(`period=${period}`);

  if (isLoading) {
    return <Skeleton className="w-full h-76" />;
  }

  if (!isSuccess) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ChartLineIcon />
          </EmptyMedia>
          <EmptyTitle>Oops, charts didn&apos;t load</EmptyTitle>
          <EmptyDescription>
            We hit a snag while loading things. Please check your connection or
            try again.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) =>
            value.length <= 4 ? value : value.slice(0, 3)
          }
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="expense"
          type="natural"
          fill="var(--color-expense)"
          fillOpacity={0.4}
          stroke="var(--color-expense)"
          stackId="a"
        />
        <Area
          dataKey="income"
          type="natural"
          fill="var(--color-income)"
          fillOpacity={0.4}
          stroke="var(--color-income)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
