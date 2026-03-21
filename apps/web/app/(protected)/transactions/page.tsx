import React, { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FileChartLineIcon, ChevronRightIcon } from "lucide-react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/item";
import { TransactionList } from "./_components/transaction-list";
import { TransactionListHeader } from "./_components/transaction-list-header";

export const metadata: Metadata = {
  title: "Transactions - Finch",
};

export default function TransactionListPage() {
  return (
    <main className="px-4">
      <div className="sticky top-0 space-y-4 py-4 bg-background">
        <Suspense fallback={null}>
          <TransactionListHeader />
        </Suspense>

        <Item variant="outline" size="sm" asChild>
          <Link href="/report" prefetch={false}>
            <ItemMedia>
              <FileChartLineIcon className="size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>See your financial report</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4" />
            </ItemActions>
          </Link>
        </Item>
      </div>

      <Suspense fallback={null}>
        <TransactionList />
      </Suspense>

      <div className="py-11" />
    </main>
  );
}
