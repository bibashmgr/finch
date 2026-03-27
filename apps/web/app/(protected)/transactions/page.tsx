import React from "react";
import { Metadata } from "next";

import { TransactionList } from "./transaction-list";

export const metadata: Metadata = {
  title: "Transactions - Finch",
};

export default function TransactionListPage() {
  return (
    <main className="px-4">
      <TransactionList />
      <div className="py-11" />
    </main>
  );
}
