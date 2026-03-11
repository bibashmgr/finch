import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/stack-layout";
import { CategoryForm } from "@/app/(protected)/categories/category-form";

export const metadata: Metadata = {
  title: "Add Category - Finch",
};

export default function CategoryCreatePage() {
  return (
    <StackLayout pageTitle="Add Category" fallbackUrl="/categories">
      <CategoryForm />
    </StackLayout>
  );
}
