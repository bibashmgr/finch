import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/stack-layout";

export const metadata: Metadata = {
  title: "Category - Finch",
};

export default function CategoryListPage() {
  return (
    <StackLayout pageTitle="Category" fallbackUrl="/settings">
      <p>Catergory List</p>
    </StackLayout>
  );
}
