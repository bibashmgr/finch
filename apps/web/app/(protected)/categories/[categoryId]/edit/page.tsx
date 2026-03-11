import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/stack-layout";
import { CategoryForm } from "@/app/(protected)/categories/category-form";

export const metadata: Metadata = {
  title: "Edit Category - Finch",
};

export default function CategoryEditPage() {
  return (
    <StackLayout pageTitle="Edit Category" fallbackUrl="/categories">
      <CategoryForm />
    </StackLayout>
  );
}
