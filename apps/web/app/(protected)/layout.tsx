import React from "react";

import { ProtectedBottomTab } from "@/components/shared/protected-bottom-tab";
import { AccessControlLayout } from "@/components/layout/access-control-layout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AccessControlLayout>
      <div className="max-w-xl mx-auto relative">
        {children}
        <ProtectedBottomTab />
      </div>
    </AccessControlLayout>
  );
}
