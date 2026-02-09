"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";

import { cn } from "@repo/ui/lib/utils";
import { protectedNavLinks } from "@/constants/protected-nav-links";

export default function ProtectedBottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <div className="bg-card flex gap-2 items-center justify-between w-fit px-2 py-2 rounded-xl">
        {protectedNavLinks.map((item) => {
          return (
            <Link key={item.title} href={item.href} prefetch={false}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={cn(
                      "size-10 flex justify-center items-center rounded-lg hover:bg-secondary text-foreground",
                      item.isHighlighted &&
                        "bg-primary text-primary-foreground hover:bg-primary/90",
                      pathname.startsWith(item.href) &&
                        "bg-secondary hover:bg-secondary/90",
                    )}
                  >
                    <item.icon className="size-5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
