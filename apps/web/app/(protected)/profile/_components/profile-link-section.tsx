"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ChevronRightIcon } from "lucide-react";

import { profileNavLinks } from "@/constants/profile-nav-links";

import { LogoutDrawer } from "./logout-drawer";

export function ProfileLinkSection() {
  const [isLogoutDrawerOpen, setIsLogoutDrawerOpen] = useState<boolean>(false);

  const handleLogoutDrawer = React.useCallback((value: boolean) => {
    setIsLogoutDrawerOpen(value);
  }, []);

  return (
    <section className="flex flex-col bg-card rounded-xl py-2 border">
      {profileNavLinks.map((item) => {
        if (item.href) {
          return (
            <Link key={item.title} href={item.href} prefetch={false}>
              <div className="flex justify-between items-center gap-4 px-4 py-2">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-lg flex items-center justify-center bg-secondary">
                    <item.icon className="size-5" />
                  </div>
                  <p className="text-sm text-semibold">{item.title}</p>
                </div>

                <ChevronRightIcon className="size-4 text-muted-foreground" />
              </div>
            </Link>
          );
        }

        return (
          <div
            key={item.title}
            className="flex items-center gap-4  px-4 py-2 cursor-pointer"
            onClick={() => handleLogoutDrawer(true)}
          >
            <div className="size-10 rounded-lg flex items-center justify-center bg-secondary">
              <item.icon className="size-5" />
            </div>
            <p className="text-sm text-semibold">{item.title}</p>
          </div>
        );
      })}

      <LogoutDrawer
        isOpen={isLogoutDrawerOpen}
        handleOpen={handleLogoutDrawer}
      />
    </section>
  );
}
