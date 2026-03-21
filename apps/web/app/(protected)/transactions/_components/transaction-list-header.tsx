"use client";

import React from "react";
import { FilterIcon } from "lucide-react";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/components/drawer";
import { Button } from "@repo/ui/components/button";
import { MonthPicker } from "@/components/month-picker";

export function TransactionListHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [filters, setFilters] = React.useState({
    date: searchParams.get("startDate")
      ? new Date(searchParams.get("startDate")!)
      : new Date(),
    type: searchParams.get("type") ?? "",
    sortBy: searchParams.get("sortBy") === "issuedAt:asc" ? "oldest" : "newest",
  });

  const handleChangeDate = React.useCallback((value: Date) => {
    setFilters((prev) => ({ ...prev, date: value }));
  }, []);

  const handleChangeTransactionType = React.useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, type: value }));
  }, []);

  const handleChangeSorting = React.useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
  }, []);

  const handleResetFilter = React.useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("type");
    params.delete("startDate");
    params.delete("endDate");
    params.delete("sortBy");

    setFilters({
      date: new Date(),
      type: "",
      sortBy: "",
    });
    router.push(`?${params.toString()}`);
    setIsDrawerOpen(false);
  }, [searchParams, router]);

  const handleApplyFilter = React.useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.type.length > 0) {
      params.set("type", filters.type);
    }

    if (filters.date) {
      const startDate = startOfMonth(filters.date).toISOString();
      const endDate = endOfMonth(filters.date).toISOString();
      params.set("startDate", startDate);
      params.set("endDate", endDate);
    }

    if (filters.sortBy.length > 0) {
      if (filters.sortBy === "newest") {
        params.set("sortBy", "issuedAt:desc");
      } else {
        params.set("sortBy", "issuedAt:asc");
      }
    }

    router.push(`?${params.toString()}`);
    setIsDrawerOpen(false);
  }, [filters, searchParams, router]);

  return (
    <section className="flex flex-row gap-2 justify-between items-center">
      <h2 className="font-bold text-lg">
        {format(filters.date, "MMMM, yyyy")}
      </h2>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button size="icon" variant="secondary" className="cursor-pointer">
            <FilterIcon className="size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="mx-auto w-full max-w-xl">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Filter transaction</DrawerTitle>
          </DrawerHeader>

          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Type</p>
              <div className="flex flex-row flex-wrap items-center gap-2">
                <Button
                  variant={filters.type === "" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full cursor-pointer border"
                  onClick={() => handleChangeTransactionType("")}
                >
                  All
                </Button>
                <Button
                  variant={filters.type === "income" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full cursor-pointer border"
                  onClick={() => handleChangeTransactionType("income")}
                >
                  Income
                </Button>
                <Button
                  variant={filters.type === "expense" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full cursor-pointer border"
                  onClick={() => handleChangeTransactionType("expense")}
                >
                  Expense
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Sort By</p>
              <div className="flex flex-row flex-wrap items-center gap-2">
                <Button
                  variant={filters.sortBy === "newest" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full cursor-pointer border"
                  onClick={() => handleChangeSorting("newest")}
                >
                  Newest
                </Button>
                <Button
                  variant={filters.sortBy === "oldest" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full cursor-pointer border"
                  onClick={() => handleChangeSorting("oldest")}
                >
                  Oldest
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">Date</p>
                <div>
                  <MonthPicker
                    value={filters.date}
                    onChange={handleChangeDate}
                  />
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter className="flex flex-row">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleResetFilter}
            >
              Reset
            </Button>
            <Button className="flex-1" onClick={handleApplyFilter}>
              Apply
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
