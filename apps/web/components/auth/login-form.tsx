"use client";

import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";

import {
  loginWithEmailFormSchema,
  LoginWithEmailFormValues,
} from "@/schemas/auth";
import { cn } from "@repo/ui/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const loginForm = useForm<LoginWithEmailFormValues>({
    resolver: zodResolver(loginWithEmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function loginWithEmail(values: LoginWithEmailFormValues) {
    console.log(values);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form id="login-form" onSubmit={loginForm.handleSubmit(loginWithEmail)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Finch</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome to Finch</h1>
          </div>

          <Controller
            name="email"
            control={loginForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  aria-invalid={fieldState.invalid}
                  autoComplete="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field>
            <Button type="submit">Login</Button>
          </Field>

          <FieldSeparator>Or</FieldSeparator>

          <Field className="grid gap-4">
            <Button variant="outline" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link href="terms-of-service" prefetch={false}>
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" prefetch={false}>
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  );
}
