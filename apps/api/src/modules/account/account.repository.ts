import { and, eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";

import { DB } from "@/modules/db/client";
import { accountsTable } from "@/modules/db/schema";
import { InjectDb } from "@/modules/db/db.provider";

@Injectable()
export class AccountRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  create(payload: typeof accountsTable.$inferInsert) {
    return this.db.insert(accountsTable).values(payload).returning();
  }

  findOneByProvider(provider: "google" | "email", providerAccountId: string) {
    return this.db.query.accountsTable.findFirst({
      where: and(
        eq(accountsTable.provider, provider),
        eq(accountsTable.providerAccountId, providerAccountId),
      ),
    });
  }
}
