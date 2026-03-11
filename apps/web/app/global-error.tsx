"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Courier_Prime, Open_Sans } from "next/font/google";

import { Button } from "@repo/ui/components/button";
import { ThemeProvider } from "@/app/_components/theme-provider";

import "@repo/ui/styles/globals.css";

const fontSans = Open_Sans({
  variable: "--font-sans",
});
const fontMono = Courier_Prime({
  variable: "--font-mono",
  weight: ["400", "700"],
});

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  function handleReset() {
    React.startTransition(() => {
      router.refresh();
      reset();
    });
  }

  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className={`${fontSans.variable} ${fontMono.variable}`}>
        <ThemeProvider>
          <main className="w-full min-h-dvh flex flex-col justify-center items-center p-4">
            <div className="max-w-sm flex flex-col justify-center items-center gap-6">
              <div className="text-center space-y-2">
                <h2 className="text-8xl font-bold text-foreground">500</h2>
                <p className="text-base font-normal text-muted-foreground">
                  We&apos;re sorry, but an unexpected error has occurred. Please
                  try again later.
                </p>
              </div>

              <Button variant="outline" onClick={handleReset}>
                Try again
              </Button>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
