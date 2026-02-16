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
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";

import {
  themeSettingFormSchema,
  ThemeSettingFormValues,
} from "@/schemas/setting";
import { themeOptions } from "@/constants/theme-options";

export function ThemeSettingForm() {
  const { setTheme, theme } = useTheme();

  const form = useForm<ThemeSettingFormValues>({
    resolver: zodResolver(themeSettingFormSchema),
    defaultValues: {
      mode: "",
    },
  });

  function handleFormSumit(values: ThemeSettingFormValues) {
    setTheme(values.mode);
  }

  React.useEffect(() => {
    if (theme) {
      form.reset({
        mode: theme,
      });
    }
  }, [theme]);

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
