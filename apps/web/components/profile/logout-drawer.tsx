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
import { Spinner } from "@repo/ui/components/spinner";

import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useLogoutUserMutation } from "@/store/apis/auth-api";
import {
  setIsProfileLoading,
  setProfileInfo,
} from "@/store/slices/profile-slice";

type LogoutDrawerProps = {
  isOpen: boolean;
  handleOpen: (value: boolean) => void;
};

export function LogoutDrawer({ isOpen, handleOpen }: LogoutDrawerProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  async function handleLogoutUser() {
    try {
      await logoutUser().unwrap();
      dispatch(setProfileInfo(null));
      dispatch(setIsProfileLoading(true));
      toast.success("Logout successful");
      router.push("/login");
    } catch {
      toast.error("Failed to logout");
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpen}>
      <DrawerContent className="mx-auto w-full max-w-xl">
        <DrawerHeader>
          <DrawerTitle>Logout</DrawerTitle>
          <DrawerDescription>
            Are you sure do you wanna logout?
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-row">
          <DrawerClose className="flex-1" asChild>
            <Button variant="outline" className="w-full" disabled={isLoading}>
              Cancel
            </Button>
          </DrawerClose>
          <Button
            className="flex-1"
            onClick={handleLogoutUser}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Confirm"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
