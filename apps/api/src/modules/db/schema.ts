import {
  index,
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
  pgEnum,
  unique,
  integer,
  bigint,
  boolean,
  numeric,
  date,
  jsonb,
} from "drizzle-orm/pg-core";

const usersTable = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    email: varchar("email", { length: 255 }).notNull().unique(),

    name: varchar("name", { length: 255 }).notNull(),
    avatarUrl: text("avatar_url"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("user_email_index").on(table.email)],
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

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    unique("accounts_provider_unique").on(
      table.provider,
      table.providerAccountId,
    ),
  ],
);

const verificationCodesTable = pgTable(
  "verification_codes",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    email: varchar("email", { length: 255 }).notNull(),
    codeHash: varchar("code_hash", { length: 255 }).notNull(),

    expiresAt: timestamp("expires_at").notNull(),
    consumedAt: timestamp("consumed_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("verification_email_index").on(table.email)],
);

const refreshTokensTable = pgTable(
  "refresh_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),

    token: text("token").notNull(),
    userAgent: text("user_agent"),
    ipAddress: varchar("ip_address", { length: 45 }),

    expiresAt: timestamp("expires_at").notNull(),
    revokedAt: timestamp("revoked_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("refresh_token_lookup_index").on(table.token),
    unique("refresh_token_unique").on(table.token),
  ],
);

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
    bytes: bigint("bytes", { mode: "number" }),
    width: integer("width"),
    height: integer("height"),
    duration: varchar("duration", { length: 20 }),

    url: text("url").notNull(),

    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("assets_user_id_index").on(table.userId),
    unique("assets_public_id_unique").on(table.publicId),
  ],
);

const themeEnum = pgEnum("theme", ["light", "dark", "system"]);

const currencyEnum = pgEnum("currency", ["npr"]);

const languageEnum = pgEnum("language", ["en", "ne"]);

const settingsTable = pgTable(
  "settings",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull()
      .unique(),

    currency: currencyEnum("currency").default("npr").notNull(),
    language: languageEnum("language").default("en").notNull(),
    theme: themeEnum("theme").default("system").notNull(),

    budgetAlerts: boolean("budget_alerts").default(true).notNull(),
    tipsArticlesAlerts: boolean("tips_articles_alerts").default(true).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("settings_user_id_index").on(table.userId)],
);

const categoryTypeEnum = pgEnum("category_type", ["income", "expense"]);

const categoriesTable = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),

    type: categoryTypeEnum("type").notNull(),
    title: varchar("title", { length: 20 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    icon: text("icon").notNull(),
    color: varchar("color", { length: 7 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("categories_user_id_index").on(table.userId),
    unique("categories_user_title_unique").on(table.userId, table.title),
  ],
);

const paymentMethodEnum = pgEnum("payment_method", ["cash", "card", "online"]);

const transactionsTable = pgTable(
  "transactions",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: uuid("category_id")
      .references(() => categoriesTable.id, { onDelete: "cascade" })
      .notNull(),

    currency: varchar("currency", {
      length: 3,
    }).notNull(),
    amount: numeric("amount").notNull(),
    notes: varchar("notes", {
      length: 255,
    }).notNull(),
    paymentMethod: paymentMethodEnum("payment_method").notNull(),
    issuedAt: timestamp("issued_at").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("transactions_user_id_index").on(table.userId),
    index("transactions_category_id_index").on(table.categoryId),
  ],
);

const transactionAttachmentsTable = pgTable(
  "transaction_attachments",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    transactionId: uuid("transaction_id")
      .references(() => transactionsTable.id, { onDelete: "cascade" })
      .notNull(),

    url: text("url").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("attachments_transaction_id_index").on(table.transactionId),
  ],
);

const budgetsTable = pgTable(
  "budgets",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: uuid("category_id")
      .references(() => categoriesTable.id, { onDelete: "cascade" })
      .notNull(),

    amount: numeric("amount").notNull(),
    month: date("month").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("budgets_user_id_index").on(table.userId),
    unique("budgets_user_category_month_unique").on(
      table.userId,
      table.categoryId,
      table.month,
    ),
  ],
);

const notificationTypeEnum = pgEnum("notification_type", [
  "budget_threshold",
  "budget_exceeded",
  "monthly_summary",
  "tips_article",
]);

const notificationsTable = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),

    type: notificationTypeEnum("type").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    body: text("body").notNull(),

    data: jsonb("data"),

    categoryId: uuid("category_id").references(() => categoriesTable.id, {
      onDelete: "set null",
    }),
    budgetId: uuid("budget_id").references(() => budgetsTable.id, {
      onDelete: "set null",
    }),
    transactionId: uuid("transaction_id").references(
      () => transactionsTable.id,
      { onDelete: "set null" },
    ),

    readAt: timestamp("read_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("notifications_user_id_index").on(table.userId),
    index("notifications_user_unread_index").on(table.userId, table.readAt),
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
  themeEnum,
  currencyEnum,
  languageEnum,
  settingsTable,
  categoryTypeEnum,
  categoriesTable,
  paymentMethodEnum,
  transactionsTable,
  transactionAttachmentsTable,
  budgetsTable,
  notificationTypeEnum,
  notificationsTable,
};
