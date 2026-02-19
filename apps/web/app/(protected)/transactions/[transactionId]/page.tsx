import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/layout/stack-layout";
import { TransactionDetail } from "@/components/transaction/transaction-detail";
import { TransactionDetailAction } from "@/components/transaction/transaction-detail-action";

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
