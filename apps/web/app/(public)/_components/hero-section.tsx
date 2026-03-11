import Link from "next/link";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";

export function HeroSection() {
  return (
    <section className="relative py-32 px-4 min-h-[calc(100dvh-64px)] flex flex-col items-center justify-center gap-6 text-center">
      <div className="flex flex-col gap-4 items-center z-10">
        <Badge variant="secondary">💸 Your Money. Your Rules.</Badge>

        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-pretty">
            Build Better Money Habits
          </h1>
          <p className="mx-auto text-muted-foreground text-base lg:text-xl">
            Track your expenses and income, set smart budgets, and understand
            where your money goes—all in one intuitive dashboard. Just sign up
            and start taking control of your money.
          </p>
        </div>

        <div className="mt-4 flex justify-center gap-3">
          <Link href="/login" prefetch={false}>
            <Button className="cursor-pointer shadow-sm transition-shadow hover:shadow">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
