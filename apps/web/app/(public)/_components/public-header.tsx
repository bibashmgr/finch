"use client";

import Link from "next/link";
import { LayoutGridIcon, LogOutIcon, SettingsIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { toast } from "@repo/ui/components/sonner";
import { Button } from "@repo/ui/components/button";
import { ThemeToggle } from "@/components/theme-toggle";

import {
  setIsProfileLoading,
  setProfileInfo,
} from "@/store/slices/profile-slice";
import {
  setIsSettingLoading,
  setSettingInfo,
} from "@/store/slices/setting-slice";
import { getInitials } from "@/utils/get-initials";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useLogoutUserMutation } from "@/store/apis/auth-api";

export function Header() {
  const profile = useAppSelector((state) => state.profile.info);

  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useAppDispatch();

  async function handleLogoutUser() {
    try {
      await logoutUser().unwrap();
      dispatch(setProfileInfo(null));
      dispatch(setIsProfileLoading(true));
      dispatch(setSettingInfo(null));
      dispatch(setIsSettingLoading(true));
      toast.success("You've been logged out successfully");
    } catch {
      toast.error("Failed to logout");
    }
  }

  return (
    <header className="w-full h-16">
      <div className="w-full h-full flex items-center justify-between px-4 max-w-xl mx-auto">
        <Link href="/" prefetch={false}>
          <h2 className="font-bold text-xl">FINCH</h2>
        </Link>

        <div className="flex gap-2 items-center">
          {profile ? (
            <>
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="border rounded-md size-9">
                    <AvatarImage
                      src={profile.avatarUrl ?? ""}
                      className="rounded-md"
                    />
                    <AvatarFallback className="rounded-md text-sm">
                      {getInitials(profile.name ?? "")}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="bottom" className="w-56">
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="size-8 rounded-lg">
                        <AvatarImage
                          src={profile.avatarUrl ?? ""}
                          alt={profile.name ?? "avatar"}
                        />
                        <AvatarFallback className="rounded-lg">
                          {getInitials(profile.name ?? "")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {profile.name}
                        </span>
                        <span className="text-muted-foreground truncate text-xs">
                          {profile.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/dashboard" prefetch={false}>
                      <DropdownMenuItem>
                        <LayoutGridIcon />
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/settings" prefetch={false}>
                      <DropdownMenuItem>
                        <SettingsIcon /> Settings
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogoutUser}>
                    <LogOutIcon />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login" prefetch={false}>
              <Button className="cursor-pointer">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
