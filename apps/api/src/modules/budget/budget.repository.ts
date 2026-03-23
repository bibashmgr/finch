import { Injectable } from "@nestjs/common";
import { and, count, desc, eq, sql } from "drizzle-orm";

import { DB } from "@/modules/db/client";
import { InjectDb } from "@/modules/db/db.provider";
import {
  budgetsTable,
  categoriesTable,
  transactionsTable,
} from "@/modules/db/schema";

@Injectable()
export class BudgetRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  private getMonthBoundaries(month: string) {
    const since = new Date(month);
    const until = new Date(since);
    until.setMonth(until.getMonth() + 1);
    return { since: since.toISOString(), until: until.toISOString() };
  }

  async findAllByUserIdAndMonth(
    filters: { userId: string; month: string },
    options: { limit?: number; page?: number },
  ) {
    const conditions = [];
    conditions.push(eq(budgetsTable.userId, filters.userId));
    conditions.push(eq(budgetsTable.month, filters.month));

    const { since, until } = this.getMonthBoundaries(filters.month);
    const { limit = 10, page = 1 } = options;
    const offset = (page - 1) * limit;

    const results = await this.db
      .select({
        id: budgetsTable.id,
        amount: budgetsTable.amount,
        month: budgetsTable.month,
        spent: sql<string>`coalesce(sum(
          case when ${transactionsTable.issuedAt} >= ${since}
            and ${transactionsTable.issuedAt} < ${until}
            then ${transactionsTable.amount}::numeric
            else 0
          end
        ), 0)`.as("spent"),
        category: {
          id: categoriesTable.id,
          type: categoriesTable.type,
          title: categoriesTable.title,
          color: categoriesTable.color,
          icon: categoriesTable.icon,
        },
      })
      .from(budgetsTable)
      .innerJoin(
        categoriesTable,
        eq(budgetsTable.categoryId, categoriesTable.id),
      )
      .leftJoin(
        transactionsTable,
        and(
          eq(transactionsTable.categoryId, budgetsTable.categoryId),
          eq(transactionsTable.userId, budgetsTable.userId),
        ),
      )
      .where(and(...conditions))
      .orderBy(desc(budgetsTable.createdAt))
      .groupBy(budgetsTable.id, categoriesTable.id)
      .limit(limit)
      .offset(offset);

    const [{ totalCount }] = await this.db
      .select({ totalCount: count() })
      .from(budgetsTable);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      results,
      page,
      limit,
      totalPages,
      totalResults: totalCount,
    };
  }

  findOneByIdAndUserId(id: string, userId: string) {
    return this.db.query.budgetsTable.findFirst({
      where: and(eq(budgetsTable.id, id), eq(budgetsTable.userId, userId)),
      with: { category: true },
    });
  }

  findOneByUserCategoryAndMonth(
    userId: string,
    categoryId: string,
    month: string,
  ) {
    return this.db.query.budgetsTable.findFirst({
      where: and(
        eq(budgetsTable.userId, userId),
        eq(budgetsTable.categoryId, categoryId),
        eq(budgetsTable.month, month),
      ),
      with: {
        category: true,
      },
    });
  }

  create(userId: string, categoryId: string, amount: string, month: string) {
    return this.db
      .insert(budgetsTable)
      .values({ userId, categoryId, amount, month })
      .returning();
  }

  update(id: string, amount: string) {
    return this.db
      .update(budgetsTable)
      .set({ amount })
      .where(eq(budgetsTable.id, id))
      .returning();
  }

  delete(id: string) {
    return this.db
      .delete(budgetsTable)
      .where(eq(budgetsTable.id, id))
      .returning();
  }
}
