import React from "react";
import { Metadata } from "next";

import { Separator } from "@repo/ui/components/separator";

export const metadata: Metadata = {
  title: "Terms of Service - Finch",
  description:
    "Review the Terms of Service for Finch to learn about our service agreements, user responsibilities, and legal protections.",
};

export default function TermsOfServicePage() {
  return (
    <main className="w-full max-w-xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Terms of Service</h1>

      <div className="space-y-4">
        <p className="text-muted-foreground">Last Updated: 23 March, 2026</p>
        <p className="text-muted-foreground">
          Welcome to Finch! These Terms of Service (&apos;Terms&apos;) govern
          your access to and use of Finch, an expense, budget, and income
          tracking web application (&apos;Service&apos;). By accessing or using
          Finch, you agree to be bound by these Terms.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">1. Use of Service</h3>
        <Separator />
        <p className="text-muted-foreground">
          Finch helps you track expenses, budgets, and income. You must use it
          lawfully and keep your account secure. You are responsible for all
          activity under your account.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">2. No Financial Advice</h3>
        <Separator />
        <p className="text-muted-foreground">
          Finch is a tracking tool only. It does not provide financial, tax, or
          investment advice.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">3. Your Data</h3>
        <Separator />
        <p className="text-muted-foreground">
          You provide and control your data. We do not guarantee its accuracy.
          Your use of Finch is also subject to our Privacy Policy.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">4. Availability</h3>
        <Separator />
        <p className="text-muted-foreground">
          We may update, modify, or stop the Service at any time without notice.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">5. Ownership</h3>
        <Separator />
        <p className="text-muted-foreground">
          All rights in Finch belong to us. You may not copy, modify, or misuse
          the Service.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">6. Termination</h3>
        <Separator />
        <p className="text-muted-foreground">
          We may suspend or terminate your access if you violate these Terms.
          You may stop using Finch anytime.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">7. Liability</h3>
        <Separator />
        <p className="text-muted-foreground">
          Finch is provided &quot;as is.&quot; We are not liable for any
          indirect or consequential damages arising from your use.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">8. Changes</h3>
        <Separator />
        <p className="text-muted-foreground">
          We may update these Terms. Continued use means you accept the changes.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">9. Contact</h3>
        <Separator />
        <p className="text-muted-foreground">
          Questions? Contact: support@finch.com
        </p>
      </div>
    </main>
  );
}
