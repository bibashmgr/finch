import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/stack-layout";
import { TransactionDetail } from "./_components/transaction-detail";
import { TransactionDetailAction } from "./_components/transaction-detail-action";

export const metadata: Metadata = {
  title: "Transaction Detail - Finch",
};

export default function TransactionDetailPage() {
  return (
    <StackLayout
      pageTitle="Transaction Detail"
      fallbackUrl="/transactions"
      action={<TransactionDetailAction />}
    >
      <TransactionDetail />
      <div className="py-7" />
    </StackLayout>
  );
}
