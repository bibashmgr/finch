import { Metadata } from "next";
import { Suspense } from "react";

import { VerifyEmailForm } from "./verify-email-form";

export const metadata: Metadata = {
  title: "Verify Email - Finch",
  description:
    "Verify your email to securely sign in to Finch and access your personal finance dashboard.",
};

export default function VerifyEmailPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-4">
      <div className="w-full max-w-sm">
        <Suspense fallback={null}>
          <VerifyEmailForm />
        </Suspense>
      </div>
    </div>
  );
}
