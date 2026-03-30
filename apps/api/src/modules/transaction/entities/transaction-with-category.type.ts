import { categoriesTable, transactionsTable } from "@/modules/db/schema";

export type TransactionWithCategory = typeof transactionsTable.$inferSelect & {
  category: typeof categoriesTable.$inferSelect;
};
