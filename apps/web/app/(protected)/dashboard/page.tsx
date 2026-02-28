import React from "react";
import { Metadata } from "next";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { RecentTransactionList } from "@/components/dashboard/recent-transaction-list";

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
