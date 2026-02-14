import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Finch",
};

export default function DashboardPage() {
  return (
    <main className="w-full min-h-dvh flex justify-center items-center">
      Home
    </main>
  );
}
