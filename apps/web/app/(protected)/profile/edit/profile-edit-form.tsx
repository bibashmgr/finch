"use client";

import React from "react";
import { Edit2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Input } from "@repo/ui/components/input";
import { toast } from "@repo/ui/components/sonner";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";

import { getInitials } from "@/utils/get-initials";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useUploadAssetMutation } from "@/store/apis/asset-api";
import { useUpdateMyProfileMutation } from "@/store/apis/user-api";
import { profileUpdateFormSchema, ProfileUpdateFormValues } from "./schema";

export function ProfileEditForm() {
  const avatarFileRef = React.useRef<HTMLInputElement | null>(null);

  const profile = useAppSelector((state) => state.profile.info);

  const [uploadAsset, { isLoading: isAssetUploading }] =
    useUploadAssetMutation();
  const [updateMyProfile] = useUpdateMyProfileMutation();

  const editProfileForm = useForm<ProfileUpdateFormValues>({
    resolver: zodResolver(profileUpdateFormSchema),
    defaultValues: {
      name: "",
      avatarUrl: "",
    },
  });

  function handleUploadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const uploadPromise = uploadAsset(formData).unwrap();

    toast.promise(uploadPromise, {
      loading: "Uploading Avatar...",
      success: (res) => {
        editProfileForm.setValue("avatarUrl", res.url, {
          shouldValidate: true,
          shouldDirty: true,
        });
        return "Avatar uploaded successfully";
      },
      error: "Failed to upload avatar",
    });
  }

  async function handleEditForm(formValues: ProfileUpdateFormValues) {
    try {
      await updateMyProfile({
        name: formValues.name,
        avatarUrl:
          formValues.avatarUrl && formValues.avatarUrl.length > 0
            ? formValues.avatarUrl
            : null,
      }).unwrap();
      toast.success("Update profile successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  }

  React.useEffect(() => {
    if (profile) {
      editProfileForm.reset({
        name: profile.name,
        avatarUrl: profile.avatarUrl ?? "",
      });
    }
  }, [profile, editProfileForm]);

  return (
    <form
      id="edit-profile-form"
      onSubmit={editProfileForm.handleSubmit(handleEditForm)}
    >
      <FieldGroup>
        <Controller
          name="avatarUrl"
          control={editProfileForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="avatar-url" hidden>
                Avatar
              </FieldLabel>

              <div className="flex justify-center items-center py-6 relative">
                <div className="relative">
                  <Avatar className="border rounded-full size-24">
                    <AvatarImage
                      src={field.value ?? ""}
                      className="rounded-full"
                    />
                    <AvatarFallback className="rounded-full text-2xl font-bold">
                      {getInitials(editProfileForm.watch("name") ?? "")}
                    </AvatarFallback>
                  </Avatar>

                  <button
                    type="button"
                    className="bg-white border shadow-xs size-8 flex justify-center items-center rounded-full absolute top-0 -right-1 cursor-pointer"
                    onClick={() => avatarFileRef.current?.click()}
                    disabled={editProfileForm.formState.isSubmitting}
                  >
                    <Edit2Icon className="size-4 text-black" />
                  </button>
                </div>
              </div>

              <Input
                type="file"
                id="avatar-file"
                name="avatar-file"
                ref={avatarFileRef}
                autoComplete="off"
                hidden
                onChange={handleUploadAvatar}
              />

              <Input
                {...field}
                id="avatar-url"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                hidden
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="name"
          control={editProfileForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your name"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button
            type="submit"
            disabled={editProfileForm.formState.isSubmitting}
          >
            {editProfileForm.formState.isSubmitting && <Spinner />}
            Update
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
