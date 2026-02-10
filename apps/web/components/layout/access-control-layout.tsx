"use client";

import React from "react";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";

import { Button } from "@repo/ui/components/button";

import { useAppSelector } from "@/hooks/use-app-selector";

type AccessControlLayout = {
  children: React.ReactNode;
};

export function AccessControlLayout({ children }: AccessControlLayout) {
  const profile = useAppSelector((state) => state.profile.info);
  const isLoading = useAppSelector((state) => state.profile.isLoading);

  if (isLoading) {
    return (
      <section className="w-full min-h-dvh flex justify-center items-center">
        <Loader2Icon className="size-5 animate-spin" />
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="w-full min-h-dvh flex flex-col justify-center items-center gap-6 px-6">
        <div className="text-center space-y-2">
          <h1 className="text-7xl font-bold text-foreground">401</h1>
          <p className="text-lg font-normal text-muted-foreground">
            You must be logged in to access this content.
          </p>
        </div>

        <Link href="/login" prefetch={false}>
          <Button variant="outline" className="cursor-pointer">
            Login
          </Button>
        </Link>
      </section>
    );
  }

  return <>{children}</>;
}
