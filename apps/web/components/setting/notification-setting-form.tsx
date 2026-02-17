"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import { toast } from "@repo/ui/components/sonner";
import { Switch } from "@repo/ui/components/switch";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";

import {
  notificationSettingFormSchema,
  NotificationSettingFormValues,
} from "@/schemas/setting";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useUpdateNotificationSettingMutation } from "@/store/apis/setting-api";

export function NotificationSettingForm() {
  const setting = useAppSelector((state) => state.setting.info);
  const [updateNotificationSetting] = useUpdateNotificationSettingMutation();

  const form = useForm<NotificationSettingFormValues>({
    resolver: zodResolver(notificationSettingFormSchema),
    defaultValues: {
      budgetAlerts: false,
      tipsArticlesAlerts: false,
    },
  });

  async function handleFormSumit(values: NotificationSettingFormValues) {
    try {
      await updateNotificationSetting(values).unwrap();
      toast.success("Update setting successfully");
    } catch {
      toast.error("Failed to update setting");
    }
  }

  React.useEffect(() => {
    if (setting) {
      form.reset({
        budgetAlerts: setting.budgetAlerts,
        tipsArticlesAlerts: setting.tipsArticlesAlerts,
      });
    }
  }, [setting, form]);

  return (
    <form
      id="notification-setting-form"
      onSubmit={form.handleSubmit(handleFormSumit)}
    >
      <FieldGroup>
        <Controller
          name="budgetAlerts"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="budget">Budget</FieldLabel>
                <FieldDescription>
                  Get notification when you&apos;re budget exceeding the limit
                </FieldDescription>
              </FieldContent>
              <Switch
                id="budget"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={field.disabled}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          )}
        />

        <Controller
          name="tipsArticlesAlerts"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="tips-and-articles">
                  Tips & Articles
                </FieldLabel>
                <FieldDescription>
                  Small & useful pieces of pratical financial advice
                </FieldDescription>
              </FieldContent>
              <Switch
                id="tips-and-articles"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={field.disabled}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          )}
        />

        <Field>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner />}
            Save
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
