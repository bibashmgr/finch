import { Injectable } from "@nestjs/common";
import { and, count, desc, eq } from "drizzle-orm";

import { DB } from "@/modules/db/client";
import { InjectDb } from "@/modules/db/db.provider";
import { categoriesTable } from "@/modules/db/schema";
import { CategoryTypeEnum } from "@/modules/category/entities/category-type.enum";

@Injectable()
export class CategoryRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  create(payload: typeof categoriesTable.$inferInsert) {
    return this.db.insert(categoriesTable).values(payload).returning();
  }

  async findAllByUserId(
    filters: { userId: string; type?: CategoryTypeEnum },
    options: { limit?: number; page?: number },
  ) {
    const conditions = [];

    if (filters.userId) {
      conditions.push(eq(categoriesTable.userId, filters.userId));
    }

    if (filters.type) {
      conditions.push(eq(categoriesTable.type, filters.type));
    }

    const { limit = 10, page = 1 } = options;
    const offset = (page - 1) * limit;

    const resultsQuery = this.db
      .select()
      .from(categoriesTable)
      .where(and(...conditions))
      .orderBy(desc(categoriesTable.createdAt))
      .limit(limit)
      .offset(offset);

    const countQuery = this.db
      .select({ totalCount: count() })
      .from(categoriesTable)
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
    return this.db.query.categoriesTable.findFirst({
      where: eq(categoriesTable.id, id),
    });
  }

  update(id: string, payload: Partial<typeof categoriesTable.$inferInsert>) {
    return this.db
      .update(categoriesTable)
      .set({ ...payload })
      .where(eq(categoriesTable.id, id))
      .returning();
  }
}
