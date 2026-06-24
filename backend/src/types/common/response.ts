export type PaginationMeta = {
  total: number;
  count: number;
  offset: number;
};

export type ListResponse<T, M = PaginationMeta> = {
  data: T[];
  meta: M;
};
