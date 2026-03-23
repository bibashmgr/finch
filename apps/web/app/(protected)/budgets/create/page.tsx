import React from "react";
import { Metadata } from "next";

import { BudgetCreateForm } from "./budget-create-form";
import { StackLayout } from "@/components/stack-layout";

export const metadata: Metadata = {
  title: "Create Budget - Finch",
};

export default function BudgetCreatePage() {
  return (
    <StackLayout pageTitle="Add Budget" fallbackUrl="/budgets">
      <BudgetCreateForm />
    </StackLayout>
  );
}
