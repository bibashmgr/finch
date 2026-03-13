export type ApiErrorResponse = {
  message: string;
  error: string;
  statusCode: string;
};

export type EmptyResponse = {
  message: string;
};

export type PaginatedResponse<RSchema> = {
  results: RSchema[];
  limit: number;
  page: number;
  totalPages: number;
  totalResults: number;
};
