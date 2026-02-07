"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { toast } from "@repo/ui/components/sonner";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { useLogoutUserMutation } from "@/store/apis/auth-api";

export default function DashboardPage() {
  const router = useRouter();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  async function handleLogoutUser() {
    try {
      await logoutUser().unwrap();
      toast.success("Logout successful");
      router.push("/login");
    } catch {
      toast.error("Failed to logout");
    }
  }

  return (
    <main className="w-full min-h-dvh flex justify-center items-center">
      <Button
        type="button"
        variant="outline"
        disabled={isLoading}
        onClick={handleLogoutUser}
      >
        {isLoading && <Spinner />}
        Logout
      </Button>
    </main>
  );
}
