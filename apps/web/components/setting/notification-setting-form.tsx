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
import { Switch } from "@repo/ui/components/switch";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";

import {
  notificationSettingFormSchema,
  NotificationSettingFormValues,
} from "@/schemas/setting";

export function NotificationSettingForm() {
  const form = useForm<NotificationSettingFormValues>({
    resolver: zodResolver(notificationSettingFormSchema),
    defaultValues: {
      budget: false,
      tipsAndArticles: false,
    },
  });

  function handleFormSumit(values: NotificationSettingFormValues) {}

  React.useEffect(() => {}, []);

  return (
    <form
      id="notification-setting-form"
      onSubmit={form.handleSubmit(handleFormSumit)}
    >
      <FieldGroup>
        <Controller
          name="budget"
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
                {...field}
                id="budget"
                value={field.value ? "on" : "off"}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          )}
        />

        <Controller
          name="tipsAndArticles"
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
                {...field}
                id="tips-and-articles"
                value={field.value ? "on" : "off"}
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
