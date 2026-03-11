"use client";

import React from "react";
import { useForm } from "react-hook-form";

import { CategoryFormValues } from "./schema";

export function CategoryForm() {
  const form = useForm<CategoryFormValues>({
    defaultValues: {
      title: "",
      description: "",
      icon: "",
    },
  });

  return <div>CategoryForm</div>;
}
