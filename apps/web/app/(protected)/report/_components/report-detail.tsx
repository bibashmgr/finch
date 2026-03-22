"use client";

import React from "react";

import { ReportDetailList } from "./report-detail-list";
import { ReportDetailCharts } from "./report-detail-charts";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/tabs";

export function ReportDetail() {
  const [period, setPeriod] = React.useState<string>("week");

  return (
    <div className="space-y-6">
      <Tabs value={period} onValueChange={setPeriod}>
        <TabsList className="w-full">
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>
      </Tabs>

      <ReportDetailCharts period={period} />
      <ReportDetailList period={period} />
    </div>
  );
}
