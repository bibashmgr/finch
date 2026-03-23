"use client";

import React from "react";
import { useParams } from "next/navigation";
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
import {
  useGetBudgetByIdQuery,
  useUpdateBudgetMutation,
} from "@/store/apis/budget-api";
import { budgetUpdateFormSchema, BudgetUpdateFormValues } from "./schema";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/empty";
import { PieChartIcon } from "lucide-react";
import { Skeleton } from "@repo/ui/components/skeleton";

export function BudgetEditForm() {
  const params = useParams<{ budgetId: string }>();

  const { data: categories } = useGetCategoriesQuery(
    "limit=100&page=1&type=expense",
  );
  const {
    data: budget,
    isLoading,
    isSuccess,
  } = useGetBudgetByIdQuery(params.budgetId);

  const [updateBudget] = useUpdateBudgetMutation();

  const form = useForm<BudgetUpdateFormValues>({
    resolver: zodResolver(budgetUpdateFormSchema),
    defaultValues: {
      month: null,
      categoryId: "",
      amount: "",
    },
  });

  async function handleFormSubmit(values: BudgetUpdateFormValues) {
    try {
      await updateBudget({
        id: params.budgetId,
        body: {
          amount: values.amount,
        },
      }).unwrap();
      form.reset();
      toast.success("Budget updated successfully");
    } catch (error) {
      let errorMessage = "Failed to update budget";

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

  React.useEffect(() => {
    if (budget) {
      form.reset({
        month: new Date(budget.month),
        amount: budget.amount,
        categoryId: budget.category.id,
      });
    }
  }, [budget, form]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <div key={index} className="space-y-2">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-full h-9" />
            </div>
          );
        })}
        <Skeleton className="w-full h-9" />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <PieChartIcon />
          </EmptyMedia>
          <EmptyTitle>Oops, budget didn&apos;t load</EmptyTitle>
          <EmptyDescription>
            We hit a snag while loading things. Please check your connection or
            try again.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
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
                disabled
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
                  disabled
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
            Update
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
