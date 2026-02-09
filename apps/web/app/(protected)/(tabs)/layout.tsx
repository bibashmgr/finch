import ProtectedBottomNavbar from "@/components/shared/protected-bottom-nav-bar";
import React from "react";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <ProtectedBottomNavbar />
    </div>
  );
}
