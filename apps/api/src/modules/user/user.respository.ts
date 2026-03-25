import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";

import { DB } from "@/modules/db/client";
import { usersTable } from "@/modules/db/schema";
import { InjectDb } from "@/modules/db/db.provider";

@Injectable()
export class UsersRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  create(payload: typeof usersTable.$inferInsert) {
    return this.db.insert(usersTable).values(payload).returning();
  }

  findOneByEmail(email: string) {
    return this.db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
  }

  findOneById(id: string) {
    return this.db.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
    });
  }

  update(id: string, payload: Partial<typeof usersTable.$inferInsert>) {
    return this.db
      .update(usersTable)
      .set({ ...payload })
      .where(eq(usersTable.id, id))
      .returning();
  }
}
