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
import { currencyOptions } from "@/constants/currency-options";
import { useUpdateCurrencySettingMutation } from "@/store/apis/setting-api";
import { currencySettingFormSchema, CurrencySettingFormValues } from "./schema";

export function CurrencySettingForm() {
  const setting = useAppSelector((state) => state.setting.info);
  const [updateCurrencySetting] = useUpdateCurrencySettingMutation();

  const form = useForm<CurrencySettingFormValues>({
    resolver: zodResolver(currencySettingFormSchema),
    defaultValues: {
      code: "",
    },
  });

  async function handleFormSumit(values: CurrencySettingFormValues) {
    try {
      await updateCurrencySetting({
        currency: values.code,
      }).unwrap();
      toast.success("Update setting successfully");
    } catch {
      toast.error("Failed to update setting");
    }
  }

  React.useEffect(() => {
    if (setting) {
      form.reset({
        code: setting.currency,
      });
    }
  }, [setting, form]);

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
