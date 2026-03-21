import React from "react";

import { TransactionWithCategory } from "@/types/transaction";

import { Card, CardContent } from "@repo/ui/components/card";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getCurrencySymbol } from "@/utils/get-currency-symbol";
import { cn } from "@repo/ui/lib/utils";
import { CategoryTypeEnum } from "@/types/category";
import { format } from "date-fns";

type TransactionCardProps = {
  transaction: TransactionWithCategory;
  showDate?: boolean;
};

export function TransactionCard({
  transaction,
  showDate = false,
}: TransactionCardProps) {
  const setting = useAppSelector((state) => state.setting.info);

  return (
    <Card className="py-4">
      <CardContent className="px-4 flex flex-row items-center justify-between gap-3">
        <div className="flex gap-3 items-center">
          <div
            style={{
              backgroundColor: `${transaction.category.color}20`,
            }}
            className="size-10 border rounded-lg flex justify-center items-center bg-green-500/20"
          >
            <p className="text-base">{transaction.category.icon}</p>
          </div>

          <div className="space-y-0.5">
            <p className="text-sm font-semibold">
              {transaction.category.title}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {transaction.notes}
              {showDate && ` · ${format(transaction.issuedAt, "dd MMM, yyyy")}`}
            </p>
          </div>
        </div>

        <p
          className={cn(
            "text-lg font-bold text-nowrap",
            transaction.category.type === CategoryTypeEnum.INCOME
              ? "text-teal-500"
              : "text-destructive",
          )}
        >
          {transaction.category.type === CategoryTypeEnum.INCOME ? "+" : "-"}
          &nbsp;
          {getCurrencySymbol(setting?.currency)}
          {transaction.amount}
        </p>
      </CardContent>
    </Card>
  );
}
