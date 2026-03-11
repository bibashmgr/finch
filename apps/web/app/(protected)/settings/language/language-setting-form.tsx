"use client";

import React from "react";
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

import { useAppSelector } from "@/hooks/use-app-selector";
import { languageOptions } from "@/constants/language-options";
import { useUpdateLanguageSettingMutation } from "@/store/apis/setting-api";
import { languageSettingFormSchema, LanguageSettingFormValues } from "./schema";

export function LanguageSettingForm() {
  const setting = useAppSelector((state) => state.setting.info);
  const [updateLanguageSetting] = useUpdateLanguageSettingMutation();

  const form = useForm<LanguageSettingFormValues>({
    resolver: zodResolver(languageSettingFormSchema),
    defaultValues: {
      code: "",
    },
  });

  async function handleFormSumit(values: LanguageSettingFormValues) {
    try {
      await updateLanguageSetting({
        language: values.code,
      }).unwrap();
      toast.success("Update setting successfully");
    } catch {
      toast.error("Failed to update setting");
    }
  }

  React.useEffect(() => {
    if (setting) {
      form.reset({
        code: setting.language,
      });
    }
  }, [setting, form]);

  return (
    <form
      id="language-setting-form"
      onSubmit={form.handleSubmit(handleFormSumit)}
    >
      <FieldGroup>
        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <RadioGroup
              {...field}
              id={field.name}
              onValueChange={field.onChange}
              aria-invalid={fieldState.invalid}
            >
              {languageOptions.map((option) => {
                return (
                  <Field
                    key={option.code}
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor={option.code}>
                        {option.name}
                      </FieldLabel>
                    </FieldContent>
                    <RadioGroupItem value={option.code} id={option.code} />
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
