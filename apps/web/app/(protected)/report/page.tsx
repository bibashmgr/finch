import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/stack-layout";
import { ReportDetail } from "./_components/report-detail";

export const metadata: Metadata = {
  title: "Report - Finch",
};

export default function ReportPage() {
  return (
    <StackLayout pageTitle="Financial Report" fallbackUrl="/transactions">
      <ReportDetail />
      <div className="py-11" />
    </StackLayout>
  );
}
