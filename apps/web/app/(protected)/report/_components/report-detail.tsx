"use client";

import React from "react";

import { ReportDetailList } from "./report-detail-list";
import { ReportDetailCharts } from "./report-detail-charts";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/tabs";

export type QueryOptions = {
  page: number;
  limit: number;
  period: string;
  sortBy: string;
};

export function ReportDetail() {
  const [queryOptions, setQueryOptions] = React.useState<QueryOptions>({
    page: 1,
    limit: 10,
    period: "week",
    sortBy: "newest",
  });

  const handleChangeQueryOptions = React.useCallback(
    (value: Partial<QueryOptions>) => {
      setQueryOptions((prev) => ({ ...prev, ...value }));
    },
    [],
  );

  return (
    <div className="space-y-6">
      <Tabs
        value={queryOptions.period}
        onValueChange={(value) =>
          setQueryOptions((prev) => ({ ...prev, period: value }))
        }
      >
        <TabsList className="w-full">
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>
      </Tabs>

      <ReportDetailCharts period={queryOptions.period} />
      <ReportDetailList
        queryOptions={queryOptions}
        handleChangeQueryOptions={handleChangeQueryOptions}
      />
    </div>
  );
}
