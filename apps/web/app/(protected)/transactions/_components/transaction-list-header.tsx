"use client";

import React from "react";
import { FilterIcon } from "lucide-react";

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

const categories = [
  "Food",
  "Shopping",
  "Transportation",
  "Entertainment",
] as const;

export function TransactionListHeader() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <section className="flex flex-row gap-2 justify-between items-center">
      <MonthPicker
        value={selectedDate}
        onChange={(value) => setSelectedDate(value)}
      />

      <Drawer>
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
                  variant="outline"
                  size="sm"
                  className="rounded-full cursor-pointer"
                >
                  Income
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full cursor-pointer"
                >
                  Expense
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Sort By</p>
              <div className="flex flex-row flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full cursor-pointer"
                >
                  Highest
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full cursor-pointer"
                >
                  Lowest
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full cursor-pointer"
                >
                  Newest
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full cursor-pointer"
                >
                  Oldest
                </Button>
              </div>
            </div>
          </div>

          <DrawerFooter className="flex flex-row">
            <Button variant="outline" className="flex-1">
              Reset
            </Button>
            <Button className="flex-1">Apply</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
