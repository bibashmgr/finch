import React from "react";

import { AccessControlLayout } from "@/components/shared/access-control-layout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AccessControlLayout>
      <div className="max-w-xl mx-auto">{children}</div>
    </AccessControlLayout>
  );
}
