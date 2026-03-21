import { and, eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";

import { DB } from "@/modules/db/client";
import { accountsTable } from "@/modules/db/schema";
import { InjectDb } from "@/modules/db/db.provider";

@Injectable()
export class AccountRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  async create(payload: typeof accountsTable.$inferInsert) {
    const [account] = await this.db
      .insert(accountsTable)
      .values(payload)
      .returning();
    return account;
  }

  async findByProvider(
    provider: "google" | "email",
    providerAccountId: string,
  ) {
    const [account] = await this.db
      .select()
      .from(accountsTable)
      .where(
        and(
          eq(accountsTable.provider, provider),
          eq(accountsTable.providerAccountId, providerAccountId),
        ),
      );
    return account;
  }
}
