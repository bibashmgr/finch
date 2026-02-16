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
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";

import {
  languageSettingFormSchema,
  LanguageSettingFormValues,
} from "@/schemas/setting";
import { languageOptions } from "@/constants/language-options";

export function LanguageSettingForm() {
  const form = useForm<LanguageSettingFormValues>({
    resolver: zodResolver(languageSettingFormSchema),
    defaultValues: {
      code: "",
    },
  });

  function handleFormSumit(values: LanguageSettingFormValues) {}

  React.useEffect(() => {}, []);

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
