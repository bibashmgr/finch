import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Transaction - Finch",
};

export default function TransactionCreatePage() {
  return (
    <main className="w-full min-h-dvh flex justify-center items-center">
      Add Transaction
    </main>
  );
}
