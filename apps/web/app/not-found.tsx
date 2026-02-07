import Link from "next/link";
import { Metadata } from "next";

import { Button } from "@repo/ui/components/button";

export const metadata: Metadata = {
  title: "Not Found - Finch",
};

export default function NotFoundPage() {
  return (
    <section className="w-full min-h-dvh flex flex-col justify-center items-center gap-8 px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-foreground">404</h1>
        <p className="text-lg font-normal text-muted-foreground">
          This page is missing or you <br />
          assembled incorrect link.
        </p>
      </div>

      <Link prefetch={false} href="/profile">
        <Button variant="outline" className="cursor-pointer">
          Back to Website
        </Button>
      </Link>
    </section>
  );
}
