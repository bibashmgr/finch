import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/stack-layout";
import { BudgetDetailAction } from "./budget-detail-action";
import { BudgetDetail } from "./budget-detail";

export const metadata: Metadata = {
  title: "Budget Detail - Finch",
};

export default function BudgetDetailPage() {
  return (
    <StackLayout
      pageTitle="Budget Detail"
      fallbackUrl="/budgets"
      action={<BudgetDetailAction />}
    >
      <BudgetDetail />
      <div className="py-7" />
    </StackLayout>
  );
}
