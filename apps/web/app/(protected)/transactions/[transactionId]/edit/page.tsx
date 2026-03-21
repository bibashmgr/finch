import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/stack-layout";
import { TransactionEditForm } from "./transaction-edit-form";

export const metadata: Metadata = {
  title: "Edit Transaction - Finch",
};

export default function TransactionEditPage() {
  return (
    <StackLayout pageTitle="Transaction Detail" fallbackUrl="/transactions">
      <TransactionEditForm />
      <div className="py-7" />
    </StackLayout>
  );
}
