import React from "react";
import Link from "next/link";

import { TransactionCard } from "@/components/transaction-card";

export function TransactionList() {
  return (
    <section className="space-y-4">
      <p className="text-base font-bold">20 Feb 2025</p>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 15 }).map((_, index) => {
          return (
            <Link key={index} href={`/transactions/1`} prefetch={false}>
              <TransactionCard />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
