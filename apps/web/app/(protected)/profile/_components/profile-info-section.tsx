"use client";

import React from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";

import { getInitials } from "@/utils/get-initials";
import { useAppSelector } from "@/hooks/use-app-selector";

export function ProfileInfoSection() {
  const profile = useAppSelector((state) => state.profile.info);

  if (!profile) {
    return null;
  }

  return (
    <section className="flex flex-col gap-2 justify-center items-center">
      <Avatar className="border rounded-full size-20">
        <AvatarImage src={profile.avatarUrl ?? ""} className="rounded-full" />
        <AvatarFallback className="rounded-full text-2xl font-bold">
          {getInitials(profile.name ?? "")}
        </AvatarFallback>
      </Avatar>

      <div className="text-center space-y-0.5">
        <p className="text-sm font-semibold">{profile.name}</p>
        <p className="text-sm text-muted-foreground">{profile.email}</p>
      </div>
    </section>
  );
}
