import React from "react";
import { Metadata } from "next";

import { ProfileEditForm } from "./profile-edit-form";
import { StackLayout } from "@/components/stack-layout";

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
