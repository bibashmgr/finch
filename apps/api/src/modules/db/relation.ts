import { relations } from "drizzle-orm";

import {
  budgetsTable,
  categoriesTable,
  notificationsTable,
  transactionAttachmentsTable,
  transactionsTable,
  usersTable,
} from "./schema";

const usersRelations = relations(usersTable, ({ many }) => ({
  categories: many(categoriesTable),
  transactions: many(transactionsTable),
  budgets: many(budgetsTable),
  notifications: many(notificationsTable),
}));

const categoriesRelations = relations(categoriesTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [categoriesTable.userId],
    references: [usersTable.id],
  }),
  transactions: many(transactionsTable),
  budgets: many(budgetsTable),
  notifications: many(notificationsTable),
}));

const transactionsRelations = relations(transactionsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [transactionsTable.userId],
    references: [usersTable.id],
  }),
  category: one(categoriesTable, {
    fields: [transactionsTable.categoryId],
    references: [categoriesTable.id],
  }),
  attachments: many(transactionAttachmentsTable),
  notifications: many(notificationsTable),
}));

const transactionAttachmentsRelations = relations(
  transactionAttachmentsTable,
  ({ one }) => ({
    transaction: one(transactionsTable, {
      fields: [transactionAttachmentsTable.transactionId],
      references: [transactionsTable.id],
    }),
  }),
);

const budgetsRelations = relations(budgetsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [budgetsTable.userId],
    references: [usersTable.id],
  }),
  category: one(categoriesTable, {
    fields: [budgetsTable.categoryId],
    references: [categoriesTable.id],
  }),
  notifications: many(notificationsTable),
}));

const notificationsRelations = relations(notificationsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [notificationsTable.userId],
    references: [usersTable.id],
  }),
  category: one(categoriesTable, {
    fields: [notificationsTable.categoryId],
    references: [categoriesTable.id],
  }),
  transaction: one(transactionsTable, {
    fields: [notificationsTable.transactionId],
    references: [transactionsTable.id],
  }),
  budget: one(budgetsTable, {
    fields: [notificationsTable.budgetId],
    references: [budgetsTable.id],
  }),
}));

export {
  usersRelations,
  categoriesRelations,
  transactionsRelations,
  transactionAttachmentsRelations,
  budgetsRelations,
  notificationsRelations,
};
