"use client";

import React from "react";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@repo/ui/components/combobox";
import { Input } from "@repo/ui/components/input";
import { toast } from "@repo/ui/components/sonner";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { MonthPicker } from "@/components/month-picker";

import { Category } from "@/types/category";
import { useGetCategoriesQuery } from "@/store/apis/category-api";
import { useCreateBudgetMutation } from "@/store/apis/budget-api";
import { budgetCreateFormSchema, BudgetCreateFormValues } from "./schema";

export function BudgetCreateForm() {
  const { data: categories } = useGetCategoriesQuery(
    "limit=100&page=1&type=expense",
  );

  const [createBudget] = useCreateBudgetMutation();

  const form = useForm<BudgetCreateFormValues>({
    resolver: zodResolver(budgetCreateFormSchema),
    defaultValues: {
      month: null,
      categoryId: "",
      amount: "",
    },
  });

  async function handleFormSubmit(values: BudgetCreateFormValues) {
    try {
      const formattedMonth = values.month ?? new Date();
      formattedMonth.setDate(1);
      formattedMonth.setHours(0, 0, 0, 0);

      await createBudget({
        ...values,
        month: format(formattedMonth, "yyyy-MM-dd"),
      }).unwrap();
      form.reset();
      toast.success("Budget created successfully");
    } catch (error) {
      let errorMessage = "Failed to create budget";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data: unknown }).data === "object" &&
        (error as { data: { message?: string } }).data !== null &&
        "message" in (error as { data: { message: string } }).data
      ) {
        errorMessage = (error as { data: { message: string } }).data.message;
      }

      toast.error(errorMessage);
    }
  }

  return (
    <form
      id="budget-form"
      className="py-4"
      onSubmit={form.handleSubmit(handleFormSubmit)}
    >
      <FieldGroup>
        <Controller
          name="month"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="type">Month</FieldLabel>
              <MonthPicker
                value={field.value ?? undefined}
                onChange={field.onChange}
                placeholder="Enter amount"
                invalid={fieldState.invalid}
                disabled={field.disabled}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="categoryId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="categoryId">Category</FieldLabel>
              <Combobox
                items={categories?.results}
                itemToStringLabel={(item: Category) => item.title}
                itemToStringValue={(item: Category) => item.id}
                value={
                  categories?.results.find((i) => i.id === field.value) ?? null
                }
                onValueChange={(value) => field.onChange(value?.id)}
              >
                <ComboboxInput
                  placeholder="Select an option"
                  aria-invalid={fieldState.invalid}
                />
                <ComboboxContent>
                  <ComboboxEmpty>No categories found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item.id} value={item}>
                        {item.title}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="amount"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="type">Amount</FieldLabel>
              <Input
                {...field}
                type="number"
                placeholder="Enter amount"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner />}
            Add
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
