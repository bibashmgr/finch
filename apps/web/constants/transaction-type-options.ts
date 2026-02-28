import { TransactionTypeEnum } from "@/types/transaction";

export const transactionTypeOptions = [
  {
    label: "Income",
    value: TransactionTypeEnum.INCOME,
  },
  {
    label: "Expense",
    value: TransactionTypeEnum.EXPENSE,
  },
];
