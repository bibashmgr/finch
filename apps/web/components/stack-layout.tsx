"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

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
      <div className="flex justify-between items-center gap-2 border-b py-4 px-4 sticky top-0 z-10 bg-background">
        <div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackButton}
            className="cursor-pointer"
          >
            <ChevronLeftIcon className="size-5" />
          </Button>
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-center">{pageTitle}</p>
        </div>

        <div className={cn(action ? "" : "size-9")}>{action}</div>
      </div>

      <main className="w-full px-4 py-4">{children}</main>
    </div>
  );
}
