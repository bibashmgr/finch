import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PlusIcon } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import { StackLayout } from "@/components/stack-layout";
import { CategoryList } from "./category-list";

export const metadata: Metadata = {
  title: "Category - Finch",
};

export default function CategoryListPage() {
  return (
    <StackLayout
      pageTitle="Category"
      fallbackUrl="/settings"
      action={
        <Link href="/categories/create">
          <Button size="icon" variant="ghost" className="cursor-pointer">
            <PlusIcon className="size-5" />
          </Button>
        </Link>
      }
    >
      <CategoryList />
    </StackLayout>
  );
}
