import Link from "next/link";
import { Metadata } from "next";

import { Button } from "@repo/ui/components/button";

export const metadata: Metadata = {
  title: "Not Found - Finch",
};

export default function NotFoundPage() {
  return (
    <main className="w-full min-h-dvh flex flex-col justify-center items-center p-4">
      <div className="max-w-sm flex flex-col gap-6 items-center justify-center">
        <div className="text-center space-y-2">
          <h1 className="text-8xl font-bold text-foreground">404</h1>
          <p className="text-base font-normal text-muted-foreground">
            This page is missing or you <br /> assembled incorrect link.
          </p>
        </div>

        <Link prefetch={false} href="/">
          <Button variant="outline" className="cursor-pointer">
            Back to Website
          </Button>
        </Link>
      </div>
    </main>
  );
}
