import { Injectable } from "@nestjs/common";
import { and, eq, gte, sql, sum } from "drizzle-orm";

import { DB } from "@/modules/db/client";
import { InjectDb } from "@/modules/db/db.provider";
import { categoriesTable, transactionsTable } from "@/modules/db/schema";

type Truncation = "day" | "month" | "year";

export interface ReportRow {
  label: string;
  income: string | null;
  expense: string | null;
}

@Injectable()
export class ReportRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  async getGroupedTotals(
    userId: string,
    since: Date,
    truncation: Truncation,
  ): Promise<ReportRow[]> {
    const labelFormat =
      truncation === "day" ? "Day" : truncation === "month" ? "Month" : "YYYY";

    const truncExpr = sql`date_trunc(${sql.raw(`'${truncation}'`)}, ${transactionsTable.issuedAt})`;

    return this.db
      .select({
        label: sql<string>`to_char(${truncExpr}, ${labelFormat})`.as("label"),
        income: sum(
          sql<number>`case when ${categoriesTable.type} = 'income' then ${transactionsTable.amount}::numeric else 0 end`,
        ),
        expense: sum(
          sql<number>`case when ${categoriesTable.type} = 'expense' then ${transactionsTable.amount}::numeric else 0 end`,
        ),
      })
      .from(transactionsTable)
      .innerJoin(
        categoriesTable,
        eq(transactionsTable.categoryId, categoriesTable.id),
      )
      .where(
        and(
          eq(transactionsTable.userId, userId),
          gte(transactionsTable.issuedAt, since),
        ),
      )
      .groupBy(truncExpr)
      .orderBy(truncExpr);
  }
}
