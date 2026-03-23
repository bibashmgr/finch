"use client";

import React from "react";
import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import { toast } from "@repo/ui/components/sonner";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";

import { themeOptions } from "@/constants/theme-options";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useUpdateThemeSettingMutation } from "@/store/apis/setting-api";
import { themeSettingFormSchema, ThemeSettingFormValues } from "./schema";

export function ThemeSettingForm() {
  const setting = useAppSelector((state) => state.setting.info);

  const { setTheme } = useTheme();
  const [updateThemeSetting] = useUpdateThemeSettingMutation();

  const form = useForm<ThemeSettingFormValues>({
    resolver: zodResolver(themeSettingFormSchema),
    defaultValues: {
      mode: "",
    },
  });

  async function handleFormSumit(values: ThemeSettingFormValues) {
    try {
      const setting = await updateThemeSetting({ theme: values.mode }).unwrap();
      setTheme(setting.theme);
      toast.success("Update setting successfully");
    } catch {
      toast.error("Failed to update setting");
    }
  }

  React.useEffect(() => {
    if (setting) {
      form.reset({
        mode: setting.theme,
      });
    }
  }, [setting, form]);

  return (
    <form id="theme-setting-form" onSubmit={form.handleSubmit(handleFormSumit)}>
      <FieldGroup>
        <Controller
          name="mode"
          control={form.control}
          render={({ field, fieldState }) => (
            <RadioGroup
              {...field}
              id={field.name}
              onValueChange={field.onChange}
              aria-invalid={fieldState.invalid}
            >
              {themeOptions.map((option) => {
                return (
                  <Field
                    key={option.id}
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor={option.id}>
                        {option.label}
                      </FieldLabel>
                    </FieldContent>
                    <RadioGroupItem value={option.value} id={option.id} />
                  </Field>
                );
              })}
            </RadioGroup>
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
