export interface Pagination {
  readonly page: number;
  readonly limit: number;
  readonly offset: number;
  readonly pageCount: number;
  readonly totalCount: number;
}
