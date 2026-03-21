"use client";

import React from "react";
import Link from "next/link";

import { cn } from "@repo/ui/lib/utils";
import { CategoryTypeEnum } from "@/types/category";
import { useGetCategoriesQuery } from "@/store/apis/category-api";

import { Badge } from "@repo/ui/components/badge";
import { Skeleton } from "@repo/ui/components/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/empty";
import { ShapesIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";

export function CategoryList() {
  const { data, isLoading, isSuccess } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => {
          return <Skeleton key={index} className="w-full h-18" />;
        })}
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShapesIcon />
          </EmptyMedia>
          <EmptyTitle>Oops, categories didn&apos;t load</EmptyTitle>
          <EmptyDescription>
            We hit a snag while loading things. Please check your connection or
            try again.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  if (data.results.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShapesIcon />
          </EmptyMedia>
          <EmptyTitle>No categories found</EmptyTitle>
          <EmptyDescription>
            Looks like there aren&apos;t any categories to show right now. Try
            adding one.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link href="/categories/create">
            <Button variant="outline" className="cursor-pointer">
              Add category
            </Button>
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {data.results.map((category) => {
        return (
          <Link key={category.id} href={`/categories/${category.id}/edit`}>
            <div className="border bg-card rounded-2xl px-4 py-4 flex flex-row gap-2 justify-between items-center cursor-pointer">
              <div className="flex flex-row gap-2 items-center">
                <div
                  className="border rounded-lg size-10 flex justify-center items-center"
                  style={{
                    backgroundColor: `${category.color}20`,
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
