import React from "react";
import { Metadata } from "next";
import { FileChartLineIcon, ChevronRightIcon } from "lucide-react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/item";
import { TransactionList } from "@/components/transaction/transaction-list";
import { TransactionListHeader } from "@/components/transaction/transaction-list-header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Transactions - Finch",
};

export default function TransactionListPage() {
  return (
    <main className="px-4">
      <div className="sticky top-0 space-y-4 py-4 bg-background">
        <TransactionListHeader />

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

      <TransactionList />

      <div className="py-11" />
    </main>
  );
}
