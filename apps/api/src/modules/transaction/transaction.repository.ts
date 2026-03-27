import { Injectable } from "@nestjs/common";
import { and, asc, count, desc, eq, gte, lte, sql, sum } from "drizzle-orm";

import { DB } from "@/modules/db/client";
import { InjectDb } from "@/modules/db/db.provider";
import { categoriesTable, transactionsTable } from "@/modules/db/schema";
import { CategoryTypeEnum } from "../category/entities/category-type.enum";

@Injectable()
export class TransactionRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  create(payload: typeof transactionsTable.$inferInsert) {
    return this.db.insert(transactionsTable).values(payload).returning();
  }

  async findAll(
    filters: {
      userId: string;
      type?: CategoryTypeEnum;
      startDate?: string;
      endDate?: string;
    },
    options: { limit?: number; page?: number; sortBy?: string },
  ) {
    const conditions = [];

    conditions.push(eq(transactionsTable.userId, filters.userId));

    if (filters.startDate) {
      conditions.push(
        gte(transactionsTable.issuedAt, new Date(filters.startDate)),
      );
    }

    if (filters.endDate) {
      conditions.push(
        lte(transactionsTable.issuedAt, new Date(filters.endDate)),
      );
    }

    if (filters.type) {
      conditions.push(eq(categoriesTable.type, filters.type));
    }

    const { limit = 10, page = 1 } = options;
    const offset = (page - 1) * limit;

    const sortFieldMap = {
      issuedAt: transactionsTable.issuedAt,
      amount: transactionsTable.amount,
      createdAt: transactionsTable.createdAt,
    };

    let orderConditions = [];

    if (options.sortBy) {
      orderConditions = options.sortBy
        .split(",")
        .map((sortItem) => {
          let [field, order] = sortItem.split(":");

          const column = sortFieldMap[field];
          if (!column) return null;

          const direction = order === "asc" ? asc : desc;

          return direction(column);
        })
        .filter(Boolean);
    }

    if (orderConditions.length === 0) {
      orderConditions.push(
        desc(transactionsTable.issuedAt),
        desc(transactionsTable.createdAt),
      );
    }

    const resultsQuery = this.db
      .select({
        id: transactionsTable.id,
        userId: transactionsTable.userId,
        currency: transactionsTable.currency,
        amount: transactionsTable.amount,
        notes: transactionsTable.notes,
        paymentMethod: transactionsTable.paymentMethod,
        issuedAt: transactionsTable.issuedAt,
        createdAt: transactionsTable.createdAt,
        updatedAt: transactionsTable.updatedAt,

        category: {
          id: categoriesTable.id,
          type: categoriesTable.type,
          title: categoriesTable.title,
          icon: categoriesTable.icon,
          color: categoriesTable.color,
        },
      })
      .from(transactionsTable)
      .innerJoin(
        categoriesTable,
        eq(transactionsTable.categoryId, categoriesTable.id),
      )
      .where(and(...conditions))
      .orderBy(...orderConditions)
      .limit(limit)
      .offset(offset);

    const countQuery = this.db
      .select({ totalCount: count() })
      .from(transactionsTable)
      .innerJoin(
        categoriesTable,
        eq(transactionsTable.categoryId, categoriesTable.id),
      )
      .where(and(...conditions));

    const [results, [{ totalCount }]] = await Promise.all([
      resultsQuery,
      countQuery,
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      results,
      page,
      limit,
      totalPages,
      totalResults: totalCount,
    };
  }

  findOneById(id: string) {
    return this.db.query.transactionsTable.findFirst({
      where: eq(transactionsTable.id, id),
    });
  }

  findOneByIdWithAttachments(id: string) {
    return this.db.query.transactionsTable.findFirst({
      where: eq(transactionsTable.id, id),
      with: {
        attachments: true,
      },
    });
  }

  findOneByIdWithCategoryAndAttachments(id: string) {
    return this.db.query.transactionsTable.findFirst({
      where: eq(transactionsTable.id, id),
      with: {
        attachments: true,
        category: true,
      },
    });
  }

  update(id: string, payload: Partial<typeof transactionsTable.$inferInsert>) {
    return this.db
      .update(transactionsTable)
      .set({ ...payload })
      .where(eq(transactionsTable.id, id))
      .returning();
  }

  getTotalIncome(userId: string, startDate: Date, endDate: Date) {
    return this.db
      .select({ total: sum(transactionsTable.amount) })
      .from(transactionsTable)
      .innerJoin(
        categoriesTable,
        eq(transactionsTable.categoryId, categoriesTable.id),
      )
      .where(
        and(
          eq(transactionsTable.userId, userId),
          eq(categoriesTable.type, "income"),
          gte(transactionsTable.issuedAt, startDate),
          lte(transactionsTable.issuedAt, endDate),
        ),
      );
  }

  getTotalExpense(userId: string, startDate: Date, endDate: Date) {
    return this.db
      .select({ total: sum(transactionsTable.amount) })
      .from(transactionsTable)
      .innerJoin(
        categoriesTable,
        eq(transactionsTable.categoryId, categoriesTable.id),
      )
      .where(
        and(
          eq(transactionsTable.userId, userId),
          eq(categoriesTable.type, "expense"),
          gte(transactionsTable.issuedAt, startDate),
          lte(transactionsTable.issuedAt, endDate),
        ),
      );
  }
}
