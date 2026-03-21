import React from "react";
import { Metadata } from "next";

import { TransactionCreateForm } from "./transaction-create-form";

export const metadata: Metadata = {
  title: "Add Transaction - Finch",
};

export default function TransactionCreatePage() {
  return (
    <main className="px-4">
      <div className="flex justify-center items-center gap-2 border-b py-4 px-4 sticky top-0 bg-background">
        <p className="text-sm font-semibold text-center">Add Transaction</p>
      </div>
      <TransactionCreateForm />
      <div className="py-11" />
    </main>
  );
}
