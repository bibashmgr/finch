import React from "react";
import { Metadata } from "next";
import { DownloadIcon } from "lucide-react";

import { ReportDetail } from "./report-detail";
import { Button } from "@repo/ui/components/button";
import { StackLayout } from "@/components/stack-layout";

export const metadata: Metadata = {
  title: "Report - Finch",
};

export default function ReportPage() {
  return (
    <StackLayout
      pageTitle="Financial Report"
      fallbackUrl="/transactions"
      action={
        <Button variant="ghost" size="icon">
          <DownloadIcon className="size-5" />
        </Button>
      }
    >
      <ReportDetail />
    </StackLayout>
  );
}
