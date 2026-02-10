import React from "react";

import { StackLayout } from "@/components/layout/stack-layout";

export default function ProfileEditPage() {
  return (
    <StackLayout pageTitle="Edit Profile" fallbackUrl="/profile">
      <section>Edit Profile</section>
    </StackLayout>
  );
}
