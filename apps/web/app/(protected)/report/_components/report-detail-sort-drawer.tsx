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

import { QueryOptions } from "./report-detail";

type ReportDetailSortDrawer = {
  queryOptions: QueryOptions;
  handleChangeQueryOptions: (value: Partial<QueryOptions>) => void;
  isDrawerOpen: boolean;
  handleChangeDrawer: (value: boolean) => void;
};

export function ReportDetailSortDrawer({
  isDrawerOpen,
  handleChangeDrawer,
  queryOptions,
  handleChangeQueryOptions,
}: ReportDetailSortDrawer) {
  const [sortBy, setSortBy] = React.useState(queryOptions.sortBy);

  const handleChangeSorting = React.useCallback((value: string) => {
    setSortBy(value);
  }, []);

  const handleResetSorting = React.useCallback(() => {
    handleChangeQueryOptions({
      sortBy: "newest",
      page: 1,
      limit: 10,
    });
    setSortBy("newest");
    handleChangeDrawer(false);
  }, [handleChangeDrawer, handleChangeQueryOptions]);

  const handleApplySorting = React.useCallback(() => {
    handleChangeQueryOptions({
      sortBy,
      page: 1,
      limit: 10,
    });
    handleChangeDrawer(false);
  }, [sortBy, handleChangeDrawer, handleChangeQueryOptions]);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleChangeDrawer}>
      <DrawerContent className="mx-auto w-full max-w-xl">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Sort transaction</DrawerTitle>
        </DrawerHeader>

        <div className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold">Sort By</p>
            <div className="flex flex-row flex-wrap items-center gap-2">
              <Button
                variant={sortBy === "newest" ? "default" : "outline"}
                size="sm"
                className="rounded-full cursor-pointer border"
                onClick={() => handleChangeSorting("newest")}
              >
                Newest
              </Button>
              <Button
                variant={sortBy === "oldest" ? "default" : "outline"}
                size="sm"
                className="rounded-full cursor-pointer border"
                onClick={() => handleChangeSorting("oldest")}
              >
                Oldest
              </Button>
              <Button
                variant={sortBy === "highest" ? "default" : "outline"}
                size="sm"
                className="rounded-full cursor-pointer border"
                onClick={() => handleChangeSorting("highest")}
              >
                Highest
              </Button>
              <Button
                variant={sortBy === "lowest" ? "default" : "outline"}
                size="sm"
                className="rounded-full cursor-pointer border"
                onClick={() => handleChangeSorting("lowest")}
              >
                Lowest
              </Button>
            </div>
          </div>
        </div>

        <DrawerFooter className="flex flex-row">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleResetSorting}
          >
            Reset
          </Button>
          <Button className="flex-1" onClick={handleApplySorting}>
            Apply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
