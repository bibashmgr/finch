export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserInput = {
  name: string;
  avatarUrl?: string | null;
};
