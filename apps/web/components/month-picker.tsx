"use client";

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

const months = [
  { long: "January", short: "Jan", index: 0 },
  { long: "February", short: "Feb", index: 1 },
  { long: "March", short: "Mar", index: 2 },
  { long: "April", short: "Apr", index: 3 },
  { long: "May", short: "May", index: 4 },
  { long: "June", short: "Jun", index: 5 },
  { long: "July", short: "Jul", index: 6 },
  { long: "August", short: "Aug", index: 7 },
  { long: "September", short: "Sep", index: 8 },
  { long: "October", short: "Oct", index: 9 },
  { long: "November", short: "Nov", index: 10 },
  { long: "December", short: "Dec", index: 11 },
] as const;

type MonthPickerProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
};

export function MonthPicker({
  value,
  onChange,
  placeholder = "Select a month",
  invalid = false,
  disabled = false,
}: MonthPickerProps) {
  const [year, setYear] = React.useState<number>(
    value ? value.getFullYear() : new Date().getFullYear(),
  );
  const [month, setMonth] = React.useState<number>(
    value ? value.getMonth() : new Date().getMonth(),
  );
  const [open, setOpen] = React.useState<boolean>(false);

  const handleYearNavigation = React.useCallback(
    (action: "increase" | "decrease") => {
      switch (action) {
        case "increase":
          setYear((prev) => prev + 1);
          break;

        case "decrease":
          setYear((prev) => prev - 1);
          break;

        default:
          break;
      }
    },
    [],
  );

  const handleSelectMonth = React.useCallback(
    (index: number) => {
      setMonth(index);
      const newDate = new Date(year, index, 1);
      onChange?.(newDate);
      setOpen(false);
    },
    [year, onChange],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-48 justify-between",
            !value && "text-muted-foreground!",
            invalid && "border-destructive! focus-visible:ring-destructive!",
          )}
          disabled={disabled}
        >
          {value
            ? `${months[value.getMonth()]?.short} ${value.getFullYear()}`
            : placeholder}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-2">
        <div className="space-y-2">
          <div className="flex justify-between gap-2 items-center">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => handleYearNavigation("decrease")}
              className="cursor-pointer"
            >
              <ChevronLeftIcon />
            </Button>

            <p className="text-sm">{year}</p>

            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => handleYearNavigation("increase")}
              className="cursor-pointer"
            >
              <ChevronRightIcon />
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {months.map((item) => {
              const isSelected = item.index === month;

              return (
                <Button
                  key={item.short}
                  variant={isSelected ? "secondary" : "ghost"}
                  size="sm"
                  className="px-2 cursor-pointer"
                  onClick={() => handleSelectMonth(item.index)}
                >
                  {item.short}
                </Button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
