import { Injectable } from "@nestjs/common";
import { and, count, desc, eq } from "drizzle-orm";

import { DB } from "@/modules/db/client";
import { InjectDb } from "@/modules/db/db.provider";
import { categoriesTable } from "@/modules/db/schema";
import { GetCategoriesFilters } from "@/modules/category/entities/get-categories-filters.type";
import { GetCategoriesOptions } from "@/modules/category/entities/get-categories-options.type";

@Injectable()
export class CategoryRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  async create(payload: typeof categoriesTable.$inferInsert) {
    const [category] = await this.db
      .insert(categoriesTable)
      .values(payload)
      .returning();
    return category;
  }

  async findAll(filters: GetCategoriesFilters, options: GetCategoriesOptions) {
    const conditions = [];

    if (filters.userId) {
      conditions.push(eq(categoriesTable.userId, filters.userId));
    }

    if (filters.type) {
      conditions.push(eq(categoriesTable.type, filters.type));
    }

    const { limit = 10, page = 1 } = options;
    const offset = (page - 1) * limit;

    const results = await this.db
      .select()
      .from(categoriesTable)
      .where(and(...conditions))
      .orderBy(desc(categoriesTable.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ totalCount }] = await this.db
      .select({ totalCount: count() })
      .from(categoriesTable);

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
    const [category] = await this.db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, id))
      .limit(1);
    return category;
  }

  async updateById(
    id: string,
    payload: Partial<typeof categoriesTable.$inferInsert>,
  ) {
    const [category] = await this.db
      .update(categoriesTable)
      .set({ ...payload })
      .where(eq(categoriesTable.id, id))
      .returning();
    return category;
  }
}
