import React from "react";
import { ShapesIcon } from "lucide-react";

import { Card, CardContent } from "@repo/ui/components/card";

export function TransactionCard() {
  return (
    <Card className="py-4">
      <CardContent className="px-4 flex flex-row items-center justify-between gap-3">
        <div className="flex gap-3 items-center">
          <div className="size-10 bg-yellow-500 rounded-lg flex justify-center items-center shrink-0">
            <ShapesIcon className="size-5 text-white" />
          </div>

          <div className="space-y-0.5">
            <p className="text-sm font-semibold">Upwork</p>
            <p className="text-xs text-muted-foreground line-clamp-1">
              Lorem ipsum dolor sit amet kakla.
            </p>
          </div>
        </div>

        <p className="text-xl font-bold text-teal-500 text-nowrap">+ ₹10,000</p>
      </CardContent>
    </Card>
  );
}
