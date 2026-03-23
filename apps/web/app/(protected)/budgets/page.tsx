import React from "react";
import { Metadata } from "next";

import { BudgetList } from "./budget-list";

export const metadata: Metadata = {
  title: "Budgets - Finch",
};

export default function BudgetListPage() {
  return (
    <main className="px-4">
      <BudgetList />
      <div className="py-11" />
    </main>
  );
}
