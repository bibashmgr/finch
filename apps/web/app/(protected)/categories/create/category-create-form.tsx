"use client";

import React from "react";
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

import { cn } from "@repo/ui/lib/utils";
import { useCreateCategoryMutation } from "@/store/apis/category-api";
import { categoryTypeOptions } from "@/constants/category-type-options";
import { categoryCreateFormSchema, CategoryCreateFormValues } from "./schema";

export function CategoryCreateForm() {
  const [createCategory] = useCreateCategoryMutation();

  const form = useForm<CategoryCreateFormValues>({
    resolver: zodResolver(categoryCreateFormSchema),
    defaultValues: {
      type: "",
      title: "",
      description: "",
      icon: "",
      color: "",
    },
  });

  async function handleFormSubmit(values: CategoryCreateFormValues) {
    try {
      await createCategory(values).unwrap();
      toast.success("Create category successfully");
      form.reset();
    } catch {
      toast.error("Failed to create category");
    }
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
              <Select {...field} onValueChange={field.onChange}>
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
            Add
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
