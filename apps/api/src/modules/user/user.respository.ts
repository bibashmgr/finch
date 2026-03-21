import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";

import { DB } from "@/modules/db/client";
import { usersTable } from "@/modules/db/schema";
import { InjectDb } from "@/modules/db/db.provider";

@Injectable()
export class UsersRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  async create(
    data: typeof usersTable.$inferInsert,
  ): Promise<typeof usersTable.$inferSelect> {
    const [user] = await this.db.insert(usersTable).values(data).returning();
    return user;
  }

  async findByEmail(
    email: string,
  ): Promise<typeof usersTable.$inferSelect | undefined> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    return user;
  }

  async findById(
    id: string,
  ): Promise<typeof usersTable.$inferSelect | undefined> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
    return user;
  }

  async update(
    id: string,
    payload: Partial<typeof usersTable.$inferInsert>,
  ): Promise<typeof usersTable.$inferSelect | undefined> {
    const [user] = await this.db
      .update(usersTable)
      .set({ ...payload })
      .where(eq(usersTable.id, id))
      .returning();
    return user;
  }
}
