import { and, eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";

import { accountsTable } from "@/modules/db/schema";
import { DbTransactionAdapter } from "@/modules/db/client";

@Injectable()
export class AccountRepository {
  constructor(private readonly txHost: TransactionHost<DbTransactionAdapter>) {}

  async create(payload: typeof accountsTable.$inferInsert) {
    const [account] = await this.txHost.tx
      .insert(accountsTable)
      .values(payload)
      .returning();
    return account;
  }

  async findByProvider(
    provider: "google" | "email",
    providerAccountId: string,
  ) {
    const [account] = await this.txHost.tx
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
