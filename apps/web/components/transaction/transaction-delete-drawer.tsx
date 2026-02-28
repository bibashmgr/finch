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

type TransactionDeleteDrawerProps = {
  isOpen: boolean;
  handleOpen: (value: boolean) => void;
};

export function TransactionDeleteDrawer({
  isOpen,
  handleOpen,
}: TransactionDeleteDrawerProps) {
  const router = useRouter();

  async function handleDeleteTransaction() {
    try {
      toast.success("Delete transaction successfully");
      router.push("/transactions");
    } catch {
      toast.error("Failed to delete transaction");
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpen}>
      <DrawerContent className="mx-auto w-full max-w-xl">
        <DrawerHeader>
          <DrawerTitle>Delete Transaction</DrawerTitle>
          <DrawerDescription>
            Are you sure wanna delete this transaction? This action cannot be
            undone.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-row">
          <DrawerClose className="flex-1" asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
          <Button className="flex-1" onClick={handleDeleteTransaction}>
            Confirm
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
