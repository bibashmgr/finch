"use client";

import Link from "next/link";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@repo/ui/components/input-otp";
import { toast } from "@repo/ui/components/sonner";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";

import { cn } from "@repo/ui/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVerifyEmailMutation } from "@/store/apis/auth-api";
import { verifyEmailFormSchema, VerifyEmailFormValues } from "./schema";

export function VerifyEmailForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const verifyEmailForm = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      code: "",
    },
  });

  async function handleFormSubmit(values: VerifyEmailFormValues) {
    try {
      const email = searchParams.get("email");

      if (!email) {
        toast.error(
          "Email information is missing. Please restart the login process.",
        );
        router.push("/login");
        return;
      }

      await verifyEmail({
        email,
        code: values.code,
      }).unwrap();
      toast.success("Email verified successfully. Welcome back!");
      verifyEmailForm.reset();
      router.push("/dashboard");
    } catch (error: unknown) {
      let errorMessage = "We couldn’t verify your email. Please try again.";
      toast.error(errorMessage);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        id="verify-email-form"
        onSubmit={verifyEmailForm.handleSubmit(handleFormSubmit)}
      >
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
            <h1 className="text-xl font-bold">Enter verification code</h1>
            <FieldDescription>
              We sent a 6-digit code to your email address
            </FieldDescription>
          </div>
          <Controller
            name="code"
            control={verifyEmailForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="code" className="sr-only">
                  Verification code
                </FieldLabel>
                <InputOTP
                  {...field}
                  id="code"
                  name="code"
                  maxLength={6}
                  containerClassName="gap-4"
                  aria-invalid={fieldState.invalid}
                >
                  <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-14 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-14 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-center"
                  />
                )}
                <FieldDescription className="text-center">
                  Didn&apos;t receive the code?{" "}
                  <Link href="/login" prefetch={false}>
                    Resend
                  </Link>
                </FieldDescription>
              </Field>
            )}
          />

          <Field>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Spinner />}
              Continue
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
