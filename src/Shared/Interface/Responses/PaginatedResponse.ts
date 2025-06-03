import ApiResponse from "./ApiResponse";

interface Pagination {
   nextPage:number | null,
  previousPage: number|null,
    page: number,
    totalPages: number,
    totalItems: number

}

export class PaginatedResponse<T> extends ApiResponse<T[]> {
pagination:Pagination
  constructor(
    message: string,
    data: T[],
    pagination:Pagination
  ) {
    super("success", message, data);
    this.pagination = pagination
  }
}
