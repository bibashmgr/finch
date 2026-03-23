import React from "react";
import { Metadata } from "next";

import { Separator } from "@repo/ui/components/separator";

export const metadata: Metadata = {
  title: "Privacy Policy - Finch",
  description:
    "Explore Finch’ Privacy Policy to understand how we handle your personal data with care, ensuring transparency, confidentiality, and full compliance with privacy regulations.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full max-w-xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <div className="space-y-4">
        <p className="text-muted-foreground">Last Updated: 23 March, 2026</p>
        <p className="text-muted-foreground">
          Finch (&apos;we&apos;, &apos;our&apos;, or &apos;us&apos;) respects
          your privacy. This Privacy Policy explains how we collect, use, and
          protect your information when you use Finch, an expense, budget, and
          income tracking web application (&apos;Service&apos;).
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">1. Information We Collect</h3>
        <Separator />
        <p className="text-muted-foreground">
          We collect information you provide directly, such as account details
          (email, name) and financial data (expenses, income, budgets). We may
          also collect basic usage data to improve the Service.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">2. How We Use Information</h3>
        <Separator />
        <p className="text-muted-foreground">
          We use your information to provide and improve Finch, personalize your
          experience, and ensure the security of your account.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">3. Data Ownership</h3>
        <Separator />
        <p className="text-muted-foreground">
          You own your financial data. We do not sell your personal information
          to third parties.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">4. Data Sharing</h3>
        <Separator />
        <p className="text-muted-foreground">
          We only share your data when required by law or to provide essential
          services (such as hosting or analytics), and only with trusted
          providers.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">5. Data Security</h3>
        <Separator />
        <p className="text-muted-foreground">
          We take reasonable measures to protect your data, but no system is
          completely secure.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">6. Data Retention</h3>
        <Separator />
        <p className="text-muted-foreground">
          We retain your data as long as your account is active or as needed to
          provide the Service.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">7. Your Rights</h3>
        <Separator />
        <p className="text-muted-foreground">
          You can access, update, or delete your data at any time through your
          account settings.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold">8. Changes</h3>
        <Separator />
        <p className="text-muted-foreground">
          We may update this Privacy Policy. Continued use of Finch means you
          accept the changes.
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
