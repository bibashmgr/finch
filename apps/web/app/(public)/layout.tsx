import React from "react";

import { Header } from "@/app/(public)/_components/public-header";
import { Footer } from "@/app/(public)/_components/public-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
