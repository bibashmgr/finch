"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@repo/ui/components/drawer";
import { toast } from "@repo/ui/components/sonner";
import { Button } from "@repo/ui/components/button";

type BudgetDeleteDrawerProps = {
  isOpen: boolean;
  handleOpen: (value: boolean) => void;
};

export function BudgetDeleteDrawer({
  isOpen,
  handleOpen,
}: BudgetDeleteDrawerProps) {
  const router = useRouter();

  async function handleDeleteBudget() {
    try {
      toast.success("Delete budget successfully");
      router.push("/budgets");
    } catch {
      toast.error("Failed to delete budget");
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpen}>
      <DrawerContent className="mx-auto w-full max-w-xl">
        <DrawerHeader>
          <DrawerTitle>Delete Budget</DrawerTitle>
          <DrawerDescription>
            Are you sure wanna delete this budget? This action cannot be undone.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-row">
          <DrawerClose className="flex-1" asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
          <Button className="flex-1" onClick={handleDeleteBudget}>
            Confirm
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
