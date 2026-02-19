import React from "react";
import { BanknoteArrowDownIcon, BanknoteArrowUpIcon } from "lucide-react";

import { Card, CardContent } from "@repo/ui/components/card";

export function DashboardStats() {
  return (
    <section>
      <Card className="py-4">
        <CardContent className="space-y-6 px-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <h2 className="text-3xl font-bold">₹2,50,000</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2 items-center">
              <div className="size-10 hidden sm:flex justify-center items-center rounded-md bg-teal-500">
                <BanknoteArrowUpIcon className="size-5 text-white" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Income</p>
                <h4 className="text-lg font-bold">₹3,00,000</h4>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div className="size-10 hidden sm:flex justify-center items-center rounded-md bg-destructive">
                <BanknoteArrowDownIcon className="size-5 text-white" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Expense</p>
                <h4 className="text-lg font-bold">₹50,000</h4>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
