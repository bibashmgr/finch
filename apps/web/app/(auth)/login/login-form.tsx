"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { toast } from "@repo/ui/components/sonner";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";

import { cn } from "@repo/ui/lib/utils";
import { useLoginWithEmailMutation } from "@/store/apis/auth-api";
import { loginWithEmailFormSchema, LoginWithEmailFormValues } from "./schema";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [loginWithEmail, { isLoading }] = useLoginWithEmailMutation();

  const loginForm = useForm<LoginWithEmailFormValues>({
    resolver: zodResolver(loginWithEmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleFormSubmit(values: LoginWithEmailFormValues) {
    try {
      await loginWithEmail(values).unwrap();
      toast.success("Verification code sent. Please check your email.");
      loginForm.reset();
      router.push(`/verify-email?email=${values.email}`);
    } catch {
      const errorMessage =
        "We couldn’t send the verification code. Please try again.";
      toast.error(errorMessage);
    }
  }

  async function loginWithGoogle() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form id="login-form" onSubmit={loginForm.handleSubmit(handleFormSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href="/"
              prefetch={false}
              className="flex flex-col items-center gap-2 font-medium"
            >
              <Image
                src="/images/logo.png"
                alt="logo"
                width={100}
                height={100}
                className="size-8"
              />
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
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Spinner />}
              Login
            </Button>
          </Field>

          <FieldSeparator>Or</FieldSeparator>

          <Field className="grid gap-4">
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              onClick={loginWithGoogle}
            >
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
