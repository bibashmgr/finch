import React from "react";
import { Metadata } from "next";

import { StackLayout } from "@/components/layout/stack-layout";
import { ProfileEditForm } from "@/components/profile/profile-edit-form";

export const metadata: Metadata = {
  title: "Edit Profile - Finch",
};

export default function ProfileEditPage() {
  return (
    <StackLayout pageTitle="Edit Profile" fallbackUrl="/profile">
      <ProfileEditForm />
    </StackLayout>
  );
}
