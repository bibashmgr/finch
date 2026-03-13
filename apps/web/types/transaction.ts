export type Transaction = {
  id: string;
  userId: string;
  categoryId: string;
  currency: string;
  amount: number;
  notes: string;
  paymentMethod: string;
  attachments: string[];
  issuedAt: string;
  createdAt: string;
  updatedAt: string;
};
