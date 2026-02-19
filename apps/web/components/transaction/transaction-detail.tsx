"use client";

import React from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { Card, CardContent } from "@repo/ui/components/card";
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";

import "react-photo-view/dist/react-photo-view.css";

export function TransactionDetail() {
  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-bold text-center text-teal-500">
        + ₹10,000
      </h1>

      <Card className="py-4">
        <CardContent className="px-4 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Type</p>
            <p className="text-sm font-semibold">Income</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="text-sm font-semibold">Upwork</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Payment Method</p>
            <p className="text-sm font-semibold">Card</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Issued At</p>
            <p className="text-sm font-semibold">20 July, 2025 11:00 AM</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Notes</p>
        <p className="text-sm font-semibold">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Attachments</p>
        <PhotoProvider>
          <ScrollArea>
            <div className="flex flex-row gap-2">
              {Array.from({ length: 2 }).map((_, index) => {
                return (
                  <PhotoView key={index} src="/images/placeholder.svg">
                    <div className="space-y-1 cursor-pointer">
                      <Image
                        src="/images/placeholder.svg"
                        alt="attachment"
                        unoptimized={true}
                        width={200}
                        height={200}
                        className="w-50 h-auto aspect-video rounded-lg"
                      />
                      <p className="text-sm text-muted-foreground">
                        invoice{index + 1}.jpg
                      </p>
                    </div>
                  </PhotoView>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </PhotoProvider>
      </div>
    </section>
  );
}
