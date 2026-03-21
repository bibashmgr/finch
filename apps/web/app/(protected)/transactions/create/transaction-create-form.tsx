"use client";

import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
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
import { Textarea } from "@repo/ui/components/textarea";
import { Calendar } from "@repo/ui/components/calendar";

import {
  transactionCreateFormSchema,
  TransactionCreateFormValues,
} from "./schema";
import { cn } from "@repo/ui/lib/utils";
import { Category } from "@/types/category";
import { useGetCategoriesQuery } from "@/store/apis/category-api";
import { categoryTypeOptions } from "@/constants/category-type-options";
import { paymentMethodOptions } from "@/constants/payment-method-options";
import { useCreateTransactionMutation } from "@/store/apis/transaction-api";

export function TransactionCreateForm() {
  const { data: categories } = useGetCategoriesQuery("limit=100&page=1");
  const [createTransaction] = useCreateTransactionMutation();

  const form = useForm<TransactionCreateFormValues>({
    resolver: zodResolver(transactionCreateFormSchema),
    defaultValues: {
      type: "",
      categoryId: "",
      amount: "",
      notes: "",
      paymentMethod: "",
      attachments: [],
      issuedAt: null,
    },
  });

  async function handleFormSubmit(values: TransactionCreateFormValues) {
    try {
      const { type, ...others } = values;
      await createTransaction({
        ...others,
        amount: parseFloat(others.amount),
        issuedAt: others.issuedAt
          ? others.issuedAt.toISOString()
          : new Date().toISOString(),
      }).unwrap();
      form.reset();
      toast.success("Transaction created successfully");
    } catch {
      toast.error("Failed to create transaction");
    }
  }

  return (
    <form
      id="transaction-form"
      className="py-4"
      onSubmit={form.handleSubmit(handleFormSubmit)}
    >
      <FieldGroup>
        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="type">Type</FieldLabel>
              <Select
                key={field.value}
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  form.setValue("categoryId", "");
                }}
              >
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categoryTypeOptions.map((option) => {
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                items={categories?.results.filter(
                  (i) => i.type === form.watch("type"),
                )}
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
                  disabled={!form.watch("type")}
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

        <Controller
          name="paymentMethod"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="type">Payment Method</FieldLabel>
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {paymentMethodOptions.map((option) => {
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="issuedAt"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="type">Issued At</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!field.value}
                    className={cn(
                      "justify-between font-normal",
                      fieldState.invalid && "border-destructive!",
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span className="text-muted-foreground">
                        Select a date
                      </span>
                    )}
                    <CalendarIcon className="text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ?? undefined}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="notes"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="type">Notes</FieldLabel>
              <Textarea
                {...field}
                placeholder="Enter notes"
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
