"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";

type StackLayoutProps = {
  pageTitle: string;
  action?: React.ReactNode;
  fallbackUrl: string;
  children: React.ReactNode;
};

export function StackLayout({
  pageTitle,
  action,
  fallbackUrl,
  children,
}: StackLayoutProps) {
  const router = useRouter();

  const handleBackButton = React.useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  }, [router, fallbackUrl]);

  return (
    <div>
      <div className="flex justify-between items-center gap-2 border-b py-4 px-4">
        <div className="flex-1">
          <ChevronLeftIcon
            className="size-5 cursor-pointer"
            onClick={handleBackButton}
          />
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-center">{pageTitle}</p>
        </div>

        <div className="flex-1">{action}</div>
      </div>

      <main className="w-full min-h-dvh px-4 pt-4">{children}</main>
    </div>
  );
}
