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
    <main className="w-full min-h-dvh px-4 py-4 space-y-6">
      <DashboardHeader />
      <DashboardStats />
      <RecentTransactionList />
      <div className="py-7" />
    </main>
  );
}
