"use client";

import React from "react";

import { useGetCategoriesQuery } from "@/store/apis/category-api";
import { Badge } from "@repo/ui/components/badge";
import { cn } from "@repo/ui/lib/utils";
import { CategoryTypeEnum } from "@/types/category";
import Link from "next/link";

export function CategoryList() {
  const { data, isLoading, isSuccess } = useGetCategoriesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isSuccess) {
    return <p>Failed to show categories</p>;
  }

  if (data.results.length === 0) {
    return <p>No categories</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data.results.map((category) => {
        return (
          <Link key={category.id} href={`/categories/${category.id}/edit`}>
            <div className="border bg-card rounded-2xl px-4 py-4 flex flex-row gap-2 justify-between items-center cursor-pointer">
              <div className="flex flex-row gap-2 items-center">
                <div
                  className="border rounded-lg size-10 flex justify-center items-center"
                  style={{
                    backgroundColor: `${category.color}30`,
                  }}
                >
                  {category.icon}
                </div>

                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">{category.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>

              <Badge
                className={cn(
                  "capitalize",
                  category.type === CategoryTypeEnum.EXPENSE
                    ? "bg-destructive"
                    : "bg-teal-500",
                )}
              >
                {category.type}
              </Badge>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
