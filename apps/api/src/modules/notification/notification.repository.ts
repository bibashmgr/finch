import { and, count, desc, eq, isNull } from "drizzle-orm";
import { Injectable } from "@nestjs/common";

import { DB } from "@/modules/db/client";
import { InjectDb } from "@/modules/db/db.provider";
import { notificationsTable } from "@/modules/db/schema";

@Injectable()
export class NotificationRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  create(input: typeof notificationsTable.$inferInsert) {
    return this.db.insert(notificationsTable).values(input).returning();
  }

  async findAllByUserId(
    filters: { userId: string },
    options: { limit?: number; page?: number },
  ) {
    const conditions = [];

    if (filters.userId) {
      conditions.push(eq(notificationsTable.userId, filters.userId));
    }

    const { limit = 10, page = 1 } = options;
    const offset = (page - 1) * limit;

    const resultsQuery = this.db
      .select()
      .from(notificationsTable)
      .where(and(...conditions))
      .orderBy(desc(notificationsTable.createdAt))
      .limit(limit)
      .offset(offset);

    const countQuery = this.db
      .select({ totalCount: count() })
      .from(notificationsTable)
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

  markAllAsReadByUserId(userId: string) {
    return this.db
      .update(notificationsTable)
      .set({ readAt: new Date() })
      .where(
        and(
          eq(notificationsTable.userId, userId),
          isNull(notificationsTable.readAt),
        ),
      )
      .returning();
  }

  markOneAsReadByUserId(id: string, userId: string) {
    return this.db
      .update(notificationsTable)
      .set({ readAt: new Date() })
      .where(
        and(
          eq(notificationsTable.id, id),
          eq(notificationsTable.userId, userId),
        ),
      )
      .returning();
  }
}
