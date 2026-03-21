"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { ArrowRightLeftIcon } from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { cn } from "@repo/ui/lib/utils";
import { CategoryTypeEnum } from "@/types/category";
import { useAppSelector } from "@/hooks/use-app-selector";
import { getCurrencySymbol } from "@/utils/get-currency-symbol";
import { useGetTransactionByIdQuery } from "@/store/apis/transaction-api";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/empty";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Card, CardContent } from "@repo/ui/components/card";
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";

import "react-photo-view/dist/react-photo-view.css";

export function TransactionDetail() {
  const params = useParams<{ transactionId: string }>();

  const {
    data: transaction,
    isLoading,
    isSuccess,
  } = useGetTransactionByIdQuery(params.transactionId);
  const setting = useAppSelector((state) => state.setting.info);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-row justify-center items-center">
          <Skeleton className="w-40 h-12" />
        </div>

        <Skeleton className="w-full h-34" />

        <div className="space-y-1">
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-full h-5" />
        </div>

        <div className="space-y-1">
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-full h-16" />
        </div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ArrowRightLeftIcon />
          </EmptyMedia>
          <EmptyTitle>Oops, transaction didn&apos;t load</EmptyTitle>
          <EmptyDescription>
            We hit a snag while loading things. Please check your connection or
            try again.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <section className="space-y-6">
      <h1
        className={cn(
          "text-4xl font-bold text-center",
          transaction.category.type === CategoryTypeEnum.INCOME
            ? "text-teal-500"
            : "text-destructive",
        )}
      >
        {transaction.category.type === CategoryTypeEnum.INCOME ? "+" : "-"}
        &nbsp;
        {getCurrencySymbol(setting?.currency ?? "")}
        {transaction.amount}
      </h1>

      <Card className="py-4">
        <CardContent className="px-4 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Type</p>
            <p className="text-sm font-semibold capitalize">
              {transaction.category.type}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="text-sm font-semibold">
              {transaction.category.title}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Payment Method</p>
            <p className="text-sm font-semibold capitalize">
              {transaction.paymentMethod}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Issued At</p>
            <p className="text-sm font-semibold">
              {format(transaction.issuedAt, "dd MMM, yyyy")}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Notes</p>
        <p className="text-sm font-semibold">{transaction.notes}</p>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Attachments</p>
        {transaction.attachments.length === 0 ? (
          <p className="text-sm">
            There are no attachments for this transaction.
          </p>
        ) : (
          <PhotoProvider>
            <ScrollArea>
              <div className="flex flex-row gap-2">
                {transaction.attachments.map((attachment, index) => {
                  return (
                    <PhotoView
                      key={attachment.id}
                      src="/images/placeholder.svg"
                    >
                      <div className="space-y-1 cursor-pointer">
                        <Image
                          src={attachment.url}
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
        )}
      </div>
    </section>
  );
}
