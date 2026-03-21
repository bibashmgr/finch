"use client";

import React from "react";
import { ShapesIcon } from "lucide-react";
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
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@repo/ui/components/color-picker";
import { Input } from "@repo/ui/components/input";
import { toast } from "@repo/ui/components/sonner";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";
import { Textarea } from "@repo/ui/components/textarea";
import { EmojiPicker } from "@/components/emoji-picker";
import { Skeleton } from "@repo/ui/components/skeleton";

import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "@/store/apis/category-api";
import { cn } from "@repo/ui/lib/utils";
import { categoryTypeOptions } from "@/constants/category-type-options";
import { categoryEditFormSchema, CategoryEditFormValues } from "./schema";

export function CategoryEditForm() {
  const params = useParams<{ categoryId: string }>();

  const {
    data: category,
    isLoading,
    isSuccess,
  } = useGetCategoryByIdQuery(params.categoryId);
  const [updateCategory] = useUpdateCategoryMutation();

  const form = useForm<CategoryEditFormValues>({
    resolver: zodResolver(categoryEditFormSchema),
    defaultValues: {
      type: "",
      title: "",
      description: "",
      icon: "",
      color: "",
    },
  });

  async function handleFormSubmit(values: CategoryEditFormValues) {
    try {
      const { type, ...others } = values;

      await updateCategory({
        id: params.categoryId,
        body: others,
      }).unwrap();
      toast.success("Update category successfully");
      form.reset();
    } catch {
      toast.error("Failed to update category");
    }
  }

  React.useEffect(() => {
    if (category) {
      form.reset({
        type: category.type,
        title: category.title,
        description: category.description,
        icon: category.icon,
        color: category.color,
      });
    }
  }, [category]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <div
              key={index}
              className={cn(
                "space-y-2 col-span-2",
                index + 1 >= 4 && "sm:col-span-1",
              )}
            >
              <Skeleton className="w-20 h-6" />
              <Skeleton
                className={cn("w-full h-9", index + 1 === 3 && "h-16")}
              />
            </div>
          );
        })}
        <Skeleton className="w-full h-9 col-span-2" />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShapesIcon />
          </EmptyMedia>
          <EmptyTitle>Oops, category didn&apos;t load</EmptyTitle>
          <EmptyDescription>
            We hit a snag while loading things. Please check your connection or
            try again.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <FieldGroup className="gap-4">
        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="type">Type</FieldLabel>
              <Select
                key={field.value}
                value={field.value}
                onValueChange={field.onChange}
                disabled
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
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                {...field}
                id="title"
                type="text"
                placeholder="Enter title"
                aria-invalid={fieldState.invalid}
                autoComplete="title"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                {...field}
                id="description"
                placeholder="Enter description"
                aria-invalid={fieldState.invalid}
                rows={3}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            name="icon"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="icon">Icon</FieldLabel>
                <EmojiPicker
                  value={field.value}
                  onValueChange={field.onChange}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="color"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="color">Color</FieldLabel>
                <ColorPicker
                  id="color"
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultFormat="hex"
                >
                  <div className="flex items-center gap-3">
                    <ColorPickerTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex items-center gap-2 px-3 w-full justify-start",
                          field.value.length === 0
                            ? "text-muted-foregroundforeground"
                            : "text-foreground",
                        )}
                      >
                        <ColorPickerSwatch className="size-5" />
                        {field.value.length === 0
                          ? "Choose a color"
                          : field.value}
                      </Button>
                    </ColorPickerTrigger>
                  </div>
                  <ColorPickerContent align="start" className="w-62">
                    <ColorPickerArea />
                    <div className="flex flex-col gap-2">
                      <ColorPickerHueSlider />
                      <ColorPickerAlphaSlider />
                    </div>
                    <ColorPickerInput />
                  </ColorPickerContent>
                </ColorPicker>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Field>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="cursor-pointer"
          >
            {form.formState.isSubmitting && <Spinner />}
            Update
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
