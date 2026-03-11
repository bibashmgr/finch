import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="px-4 h-14">
      <div className="max-w-xl mx-auto h-full flex justify-between items-center border-t gap-4">
        <p className="text-xs text-muted-foreground">© 2026 FINCH</p>

        <div className="flex gap-4 items-center">
          <Link href="/terms-of-service" prefetch={false}>
            <p className="text-xs text-muted-foreground hover:underline">
              Terms of Service
            </p>
          </Link>

          <Link href="/privacy-policy" prefetch={false}>
            <p className="text-xs text-muted-foreground hover:underline">
              Privacy Policy
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
