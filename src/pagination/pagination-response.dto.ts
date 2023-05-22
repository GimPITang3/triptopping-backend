export class PaginationResponseDto<T> {
  total: number;

  skip: number;

  limit: number;

  items: T[];
}
