"use client";

import React from "react";
import Link from "next/link";
import { BellIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";

import { getInitials } from "@/utils/get-initials";
import { useAppSelector } from "@/hooks/use-app-selector";

export function DashboardHeader() {
  const profile = useAppSelector((state) => state.profile.info);

  return (
    <section className="flex flex-row justify-between gap-4">
      <div className="flex flex-row gap-2">
        <Avatar className="border rounded-md size-10">
          <AvatarImage src={profile?.avatarUrl ?? ""} className="rounded-md" />
          <AvatarFallback className="rounded-md text-sm">
            {getInitials(profile?.name ?? "")}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-0.5">
          <p className="text-xs text-muted-foreground">Good morning</p>
          <p className="text-base font-semibold">Bibash Magar</p>
        </div>
      </div>

      <Link href="/notifications" prefetch={false}>
        <Button variant="secondary" size="icon-lg" className="cursor-pointer">
          <BellIcon className="size-5" />
        </Button>
      </Link>
    </section>
  );
}
