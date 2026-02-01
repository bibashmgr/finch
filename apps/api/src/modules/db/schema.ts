import {
  index,
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
  pgEnum,
  unique,
} from "drizzle-orm/pg-core";

const usersTable = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    email: varchar("email", { length: 255 }).notNull().unique(),

    name: varchar("name", { length: 255 }).notNull(),
    avatarUrl: text("avatar_url"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [index("email_index").on(table.email)],
);

const accountProviderEnum = pgEnum("provider", ["google", "email"]);

const accountsTable = pgTable(
  "accounts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .references(() => usersTable.id, {
        onDelete: "cascade",
      })
      .notNull(),

    provider: accountProviderEnum().notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [unique().on(table.provider, table.providerAccountId)],
);

const verificationCodesTable = pgTable("verification_codes", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: varchar("email", { length: 255 }).notNull(),
  codeHash: varchar("code_hash", { length: 255 }).notNull(),

  expiresAt: timestamp("expires_at").notNull(),
  consumedAt: timestamp("consumed_at"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const refreshTokensTable = pgTable("refresh_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),

  token: text("token").notNull(),
  userAgent: text("user_agent"),
  ipAddress: varchar("ip_address", { length: 45 }),

  expiresAt: timestamp("expires_at").notNull(),
  revokedAt: timestamp("revoked_at"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export {
  usersTable,
  accountProviderEnum,
  accountsTable,
  verificationCodesTable,
  refreshTokensTable,
};
