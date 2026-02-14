import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions - Finch",
};

export default function TransactionListPage() {
  return (
    <main className="w-full min-h-dvh flex justify-center items-center">
      Transactions
    </main>
  );
}
