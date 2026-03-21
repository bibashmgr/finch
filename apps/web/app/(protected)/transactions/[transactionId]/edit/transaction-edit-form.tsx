"use client";

import React from "react";
import { format } from "date-fns";
import { ArrowRightLeftIcon, CalendarIcon } from "lucide-react";
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
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/empty";
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
import { Skeleton } from "@repo/ui/components/skeleton";
import { Textarea } from "@repo/ui/components/textarea";
import { Calendar } from "@repo/ui/components/calendar";

import {
  useGetTransactionByIdQuery,
  useUpdateTransactionMutation,
} from "@/store/apis/transaction-api";
import { cn } from "@repo/ui/lib/utils";
import { Category } from "@/types/category";
import { useGetCategoriesQuery } from "@/store/apis/category-api";
import { categoryTypeOptions } from "@/constants/category-type-options";
import { paymentMethodOptions } from "@/constants/payment-method-options";
import { transactionEditFormSchema, TransactionEditFormValues } from "./schema";

export function TransactionEditForm() {
  const params = useParams<{ transactionId: string }>();

  const { data: categories } = useGetCategoriesQuery("limit=100&page=1");
  const {
    data: transaction,
    isLoading,
    isSuccess,
  } = useGetTransactionByIdQuery(params.transactionId);

  const [updateTransaction] = useUpdateTransactionMutation();

  const form = useForm<TransactionEditFormValues>({
    resolver: zodResolver(transactionEditFormSchema),
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

  async function handleFormSubmit(values: TransactionEditFormValues) {
    try {
      const { type, ...others } = values;
      await updateTransaction({
        id: params.transactionId,
        body: {
          ...others,
          amount: parseFloat(others.amount),
          issuedAt: others.issuedAt
            ? others.issuedAt.toISOString()
            : new Date().toISOString(),
        },
      }).unwrap();
      form.reset();
      toast.success("Transaction updated successfully");
    } catch {
      toast.error("Failed to update transaction");
    }
  }

  React.useEffect(() => {
    if (transaction) {
      form.reset({
        amount: transaction.amount.toString(),
        notes: transaction.notes,
        issuedAt: new Date(transaction.issuedAt),
        categoryId: transaction.category.id,
        type: transaction.category.type,
        paymentMethod: transaction.paymentMethod,
        attachments: transaction.attachments.map((a) => a.url),
      });
    }
  }, [transaction]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 6 }).map((_, index) => {
          return (
            <div key={index} className="space-y-2">
              <Skeleton className="w-20 h-6" />
              <Skeleton
                className={cn("w-full h-9", index + 1 === 6 && "h-16")}
              />
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
            <ArrowRightLeftIcon />
          </EmptyMedia>
          <EmptyTitle>Oops, transaction didn&apos;t load</EmptyTitle>
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
              <Select
                key={field.value}
                value={field.value}
                onValueChange={field.onChange}
              >
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
            Update
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
