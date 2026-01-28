import {
  index,
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
} from "drizzle-orm/pg-core";

const usersTable = pgTable(
  "users",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: text().notNull(),
    avatar: varchar({ length: 255 }),
    created_at: timestamp("createdAt").defaultNow(),
    updated_at: timestamp("updatedAt").defaultNow(),
  },
  (table) => [index("email_index").on(table.email)],
);

export { usersTable };
