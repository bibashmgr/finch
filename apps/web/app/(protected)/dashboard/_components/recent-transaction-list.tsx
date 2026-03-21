import React from "react";
import Link from "next/link";

import { TransactionCard } from "@/components/transaction-card";

export function RecentTransactionList() {
  return (
    <section className="space-y-4">
      <div className="flex gap-2 justify-between items-center">
        <p className="text-base font-bold">Recent Transactions</p>

        <Link href="/transactions" prefetch={false}>
          <p className="text-base text-muted-foreground hover:underline">
            See all
          </p>
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {/* {Array.from({ length: 10 }).map((_, index) => {
          return (
            <Link key={index} href={`/transactions/1`} prefetch={false}>
              <TransactionCard />
            </Link>
          );
        })} */}
      </div>
    </section>
  );
}
