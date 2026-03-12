"use client";

import React from "react";
import { SmileIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { Button } from "@repo/ui/components/button";

import { cn } from "@repo/ui/lib/utils";
import { emojiOptions } from "@/constants/emoji-options";
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";

type EmojiPickerProps = {
  value?: string;
  onValueChange?: (value: string) => void;
};

export function EmojiPicker({ value, onValueChange }: EmojiPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-between cursor-pointer hover:bg-transparent px-3 font-medium text-base sm:text-sm",
            value && value.length > 0
              ? "text-foreground"
              : "text-muted-foreground hover:text-muted-foreground",
          )}
        >
          {value && value.length > 0 ? value : "Choose an icon"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-2 w-62">
        <ScrollArea className="w-full h-48">
          <div className="flex flex-row flex-wrap">
            {emojiOptions.map((option) => {
              return (
                <Button
                  key={option.slug}
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => onValueChange!(option.emoji)}
                >
                  {option.emoji}
                </Button>
              );
            })}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
