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
  currencySettingFormSchema,
  CurrencySettingFormValues,
} from "@/schemas/setting";
import { currencyOptions } from "@/constants/currency-options";

export function CurrencySettingForm() {
  const form = useForm<CurrencySettingFormValues>({
    resolver: zodResolver(currencySettingFormSchema),
    defaultValues: {
      code: "",
    },
  });

  function handleFormSumit(values: CurrencySettingFormValues) {}

  React.useEffect(() => {}, []);

  return (
    <form
      id="currency-setting-form"
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
              {currencyOptions.map((option) => {
                return (
                  <Field
                    key={option.code}
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor={option.code}>
                        {option.name} ({option.code.toUpperCase()})
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
