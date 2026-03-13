import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/stack-layout";
import { CategoryEditForm } from "./category-edit-form";

export const metadata: Metadata = {
  title: "Edit Category - Finch",
};

export default function CategoryEditPage() {
  return (
    <StackLayout pageTitle="Edit Category" fallbackUrl="/categories">
      <CategoryEditForm />
    </StackLayout>
  );
}
