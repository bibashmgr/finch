"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useAppSelector } from "@/hooks/use-app-selector";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const setting = useAppSelector((state) => state.setting.info);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={setting?.theme ?? "system"}
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  );
}
