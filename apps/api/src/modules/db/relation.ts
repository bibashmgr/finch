import { relations } from "drizzle-orm";

import {
  budgetsTable,
  categoriesTable,
  transactionAttachmentsTable,
  transactionsTable,
  usersTable,
} from "./schema";

const usersRelations = relations(usersTable, ({ many }) => ({
  categories: many(categoriesTable),
  transactions: many(transactionsTable),
}));

const categoriesRelations = relations(categoriesTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [categoriesTable.userId],
    references: [usersTable.id],
  }),

  transactions: many(transactionsTable),

  budgets: many(budgetsTable),
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

const budgetsRelations = relations(budgetsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [budgetsTable.userId],
    references: [usersTable.id],
  }),

  category: one(categoriesTable, {
    fields: [budgetsTable.categoryId],
    references: [categoriesTable.id],
  }),
}));

export {
  usersRelations,
  categoriesRelations,
  transactionsRelations,
  transactionAttachmentsRelations,
  budgetsRelations,
};
