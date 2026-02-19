import React from "react";
import { ChartPie } from "lucide-react";

export function NotificationItem() {
  return (
    <div className="flex justify-between gap-4 border-b py-3">
      <div className="flex gap-3 flex-1">
        <div className="size-9 flex justify-center items-center bg-destructive rounded-md shrink-0">
          <ChartPie className="size-4" />
        </div>

        <p className="text-sm line-clamp-2 font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          itaque, deleniti dignissimos facilis eos soluta exercitationem
          nesciunt harum ipsa? Reprehenderit.
        </p>
      </div>

      <p className="text-xs text-muted-foreground text-nowrap">30m</p>
    </div>
  );
}
