"use client";

import React from "react";

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@repo/ui/components/drawer";
import { Button } from "@repo/ui/components/button";
import { MonthPicker } from "@/components/month-picker";

import { QueryOptions } from "./transaction-list";

type TransactionFilterDrawer = {
  queryOptions: {
    type: string;
    date: Date;
    sortBy: string;
  };
  handleChangeQueryOptions: (value: QueryOptions) => void;
  isDrawerOpen: boolean;
  handleChangeDrawer: (value: boolean) => void;
};

export function TransactionFilterDrawer({
  isDrawerOpen,
  handleChangeDrawer,
  queryOptions,
  handleChangeQueryOptions,
}: TransactionFilterDrawer) {
  const [filters, setFilters] = React.useState({
    type: queryOptions.type,
    date: queryOptions.date,
    sortBy: queryOptions.sortBy,
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
    handleChangeQueryOptions({
      type: "",
      date: new Date(),
      sortBy: "newest",
      page: 1,
      limit: 10,
    });
    setFilters({
      type: "",
      date: new Date(),
      sortBy: "newest",
    });
    handleChangeDrawer(false);
  }, [handleChangeDrawer, handleChangeQueryOptions]);

  const handleApplyFilter = React.useCallback(() => {
    handleChangeQueryOptions({
      ...filters,
      page: 1,
      limit: 10,
    });
    handleChangeDrawer(false);
  }, [filters, handleChangeDrawer, handleChangeQueryOptions]);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleChangeDrawer}>
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
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Date</p>
            <div>
              <MonthPicker value={filters.date} onChange={handleChangeDate} />
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
  );
}
