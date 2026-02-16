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
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
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
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
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
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
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
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

const assetTypeEnum = pgEnum("asset_type", ["image", "video", "raw"]);

const assetsTable = pgTable(
  "assets",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),

    publicId: varchar("public_id", { length: 255 }).notNull(),
    assetType: assetTypeEnum("asset_type").notNull(),

    originalFilename: varchar("original_filename", { length: 255 }),
    format: varchar("format", { length: 50 }),
    bytes: varchar("bytes", { length: 20 }),
    width: varchar("width", { length: 10 }),
    height: varchar("height", { length: 10 }),
    duration: varchar("duration", { length: 20 }),

    url: text("secure_url").notNull(),

    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("assets_user_id_index").on(table.userId),
    unique("assets_public_id_unique").on(table.publicId),
  ],
);

export {
  usersTable,
  accountProviderEnum,
  accountsTable,
  verificationCodesTable,
  refreshTokensTable,
  assetTypeEnum,
  assetsTable,
};
