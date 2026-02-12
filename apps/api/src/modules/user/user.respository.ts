import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";

import { usersTable } from "@/modules/db/schema";
import { DbTransactionAdapter } from "@/modules/db/client";

@Injectable()
export class UsersRepository {
  constructor(private readonly txHost: TransactionHost<DbTransactionAdapter>) {}

  async create(
    data: typeof usersTable.$inferInsert,
  ): Promise<typeof usersTable.$inferSelect> {
    const [user] = await this.txHost.tx
      .insert(usersTable)
      .values(data)
      .returning();
    return user;
  }

  async findByEmail(
    email: string,
  ): Promise<typeof usersTable.$inferSelect | undefined> {
    const [user] = await this.txHost.tx
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    return user;
  }

  async findById(
    id: string,
  ): Promise<typeof usersTable.$inferSelect | undefined> {
    const [user] = await this.txHost.tx
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
    const [user] = await this.txHost.tx
      .update(usersTable)
      .set({ ...payload, updatedAt: new Date() })
      .where(eq(usersTable.id, id))
      .returning();
    return user;
  }
}
