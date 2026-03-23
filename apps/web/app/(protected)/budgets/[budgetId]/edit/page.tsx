import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/stack-layout";
import { BudgetEditForm } from "./budget-edit-form";

export const metadata: Metadata = {
  title: "Edit Budget - Finch",
};

export default function BudgetEditPage() {
  return (
    <StackLayout pageTitle="Edit Budget" fallbackUrl="/budgets">
      <BudgetEditForm />
    </StackLayout>
  );
}
