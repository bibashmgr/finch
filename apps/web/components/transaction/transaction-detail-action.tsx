"use client";

import React from "react";
import Link from "next/link";
import { EllipsisVerticalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Button } from "@repo/ui/components/button";
import { TransactionDeleteDrawer } from "@/components/transaction/transaction-delete-drawer";

export function TransactionDetailAction() {
  const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] =
    React.useState<boolean>(false);

  const handleDeleteDrawer = React.useCallback((value: boolean) => {
    setIsDeleteDrawerOpen(value);
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <EllipsisVerticalIcon className="size-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <Link href={`/transactions/1/edit`} prefetch={false}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => handleDeleteDrawer(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <TransactionDeleteDrawer
        isOpen={isDeleteDrawerOpen}
        handleOpen={handleDeleteDrawer}
      />
    </>
  );
}
