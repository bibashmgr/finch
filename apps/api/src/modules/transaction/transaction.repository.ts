import { Injectable } from "@nestjs/common";
import { and, asc, count, desc, eq, gte, lte } from "drizzle-orm";

import { DB } from "@/modules/db/client";
import { InjectDb } from "@/modules/db/db.provider";
import { categoriesTable, transactionsTable } from "@/modules/db/schema";
import { GetTransactionsOptions } from "@/modules/transaction/entities/get-transactions-options.type";
import { GetTransactionsFilters } from "@/modules/transaction/entities/get-transactions-filters.type";

@Injectable()
export class TransactionRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  async create(payload: typeof transactionsTable.$inferInsert) {
    const [transaction] = await this.db
      .insert(transactionsTable)
      .values(payload)
      .returning();
    return transaction;
  }

  async findAll(
    filters: GetTransactionsFilters,
    options: GetTransactionsOptions,
  ) {
    const conditions = [];

    if (filters.userId) {
      conditions.push(eq(transactionsTable.userId, filters.userId));
    }

    if (filters.startDate && filters.endDate) {
      conditions.push(
        and(
          gte(transactionsTable.issuedAt, new Date(filters.startDate)),
          lte(transactionsTable.issuedAt, new Date(filters.endDate)),
        ),
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
      orderConditions.push(desc(transactionsTable.issuedAt));
    }

    const results = await this.db
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

    const [{ totalCount }] = await this.db
      .select({ totalCount: count() })
      .from(transactionsTable);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      results,
      page,
      limit,
      totalPages,
      totalResults: totalCount,
    };
  }

  async findById(id: string) {
    const [transaction] = await this.db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.id, id))
      .limit(1);
    return transaction;
  }

  async findByIdWithAttachments(id: string) {
    const transaction = await this.db.query.transactionsTable.findFirst({
      where: eq(transactionsTable.id, id),
      with: {
        attachments: true,
      },
    });

    return transaction;
  }

  async findByIdWithDetails(id: string) {
    const transaction = await this.db.query.transactionsTable.findFirst({
      where: eq(transactionsTable.id, id),
      with: {
        attachments: true,
        category: true,
      },
    });

    return transaction;
  }

  async updateById(
    id: string,
    payload: Partial<typeof transactionsTable.$inferInsert>,
  ) {
    const [transaction] = await this.db
      .update(transactionsTable)
      .set({ ...payload })
      .where(eq(transactionsTable.id, id))
      .returning();
    return transaction;
  }
}
