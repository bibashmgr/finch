import React from "react";
import { Metadata } from "next";

import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardStats } from "./_components/dashboard-stats";
import { RecentTransactionList } from "./_components/recent-transaction-list";

export const metadata: Metadata = {
  title: "Home - Finch",
};

export default function DashboardPage() {
  return (
    <main className="px-4">
      <DashboardHeader />
      <div className="space-y-6">
        <DashboardStats />
        <RecentTransactionList />
      </div>
      <div className="py-11" />
    </main>
  );
}
