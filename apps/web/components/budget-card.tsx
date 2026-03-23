import React from "react";

import { cn } from "@repo/ui/lib/utils";
import { useAppSelector } from "@/hooks/use-app-selector";
import { BudgetWithCategoryAndSpent } from "@/types/budget";
import { getCurrencySymbol } from "@/utils/get-currency-symbol";

import { Progress } from "@repo/ui/components/progress";
import { Card, CardContent } from "@repo/ui/components/card";

type BudgetCardProps = {
  budget: BudgetWithCategoryAndSpent;
  showDate?: boolean;
};

export function BudgetCard({ budget }: BudgetCardProps) {
  const setting = useAppSelector((state) => state.setting.info);

  const progress = React.useMemo(() => {
    const amountNum = Number(budget.amount);
    const spentNum = Number(budget.spent);

    if (spentNum > amountNum) {
      return 100;
    }

    return (spentNum / amountNum) * 100;
  }, [budget]);

  return (
    <Card className="py-4">
      <CardContent className="px-4 flex flex-col gap-2">
        <div className="space-y-2 w-full">
          <p className="text-sm font-semibold">
            <span className="text-xs">{budget.category.icon}</span>{" "}
            {budget.category.title}
          </p>
          <Progress
            className={cn("w-full", progress >= 100 && "*:bg-destructive")}
            value={progress}
          />
          <p className="text-sm text-muted-foreground">
            {`${getCurrencySymbol(setting?.currency)}${budget.spent} of ${getCurrencySymbol(setting?.currency)}${budget.amount}`}
            {progress >= 100 && (
              <span className="text-xs text-destructive ml-3">
                ( You&apos;ve exceed the limit )
              </span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
