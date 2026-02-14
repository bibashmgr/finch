import React from "react";
import { Metadata } from "next";

import { ProfileInfoSection } from "@/components/profile/profile-info-section";
import { ProfileLinkSection } from "@/components/profile/profile-link-section";

export const metadata: Metadata = {
  title: "Profile - Finch",
};

export default function ProfilePage() {
  return (
    <main className="w-full min-h-dvh py-12 px-4 space-y-12">
      <ProfileInfoSection />
      <ProfileLinkSection />
    </main>
  );
}
