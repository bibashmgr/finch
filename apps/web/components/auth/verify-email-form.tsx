import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@repo/ui/components/input-otp";
import { Button } from "@repo/ui/components/button";

import { cn } from "@repo/ui/lib/utils";

export function VerifyEmailForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href="/"
              prefetch={false}
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Finch</span>
            </Link>
            <h1 className="text-xl font-bold">Enter verification code</h1>
            <FieldDescription>
              We sent a 6-digit code to your email address
            </FieldDescription>
          </div>

          <Field>
            <FieldLabel htmlFor="otp" className="sr-only">
              Verification code
            </FieldLabel>
            <InputOTP
              maxLength={6}
              id="otp"
              required
              containerClassName="gap-4"
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
            <FieldDescription className="text-center">
              Didn&apos;t receive the code? <a href="#">Resend</a>
            </FieldDescription>
          </Field>

          <Field>
            <Button type="submit">Verify</Button>
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
