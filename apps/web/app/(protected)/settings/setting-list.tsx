"use client";

import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import { useAppSelector } from "@/hooks/use-app-selector";
import { languageOptions } from "@/constants/language-options";

export function SettingList() {
  const setting = useAppSelector((state) => state.setting.info);

  return (
    <section className="flex flex-col">
      <SettingItem
        title="Currency"
        href="/settings/currency"
        value={setting?.currency.toUpperCase()}
      />
      <SettingItem
        title="Language"
        href="/settings/language"
        value={languageOptions.find((i) => i.code === setting?.language)?.name}
      />
      <SettingItem
        title="Theme"
        href="/settings/theme"
        value={setting?.theme}
      />
      <SettingItem title="Notification" href="/settings/notification" />
    </section>
  );
}

function SettingItem({
  title,
  href,
  value = "",
}: {
  title: string;
  href: string;
  value?: string;
}) {
  return (
    <Link href={href} prefetch={false}>
      <div className="flex justify-between items-center gap-4 py-3">
        <div className="flex items-center gap-4">
          <p className="text-sm text-semibold">{title}</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground capitalize">{value}</p>
          <ChevronRightIcon className="size-4 text-muted-foreground" />
        </div>
      </div>
    </Link>
  );
}
