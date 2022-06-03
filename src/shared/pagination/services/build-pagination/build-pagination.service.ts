import { Injectable } from '@nestjs/common';
import { PaginationDto } from '@/shared/pagination/dtos/pagination.dto';
import { Pagination } from '@/shared/pagination/interfaces/pagination.interface';

@Injectable()
export class BuildPaginationService {
  public buildPaginationObject(paginationData: PaginationDto): Pagination {
    const { totalCount, page } = paginationData;

    const offset = Number(paginationData.offset);
    const limit = Number(paginationData.limit);

    const pageCount = Math.ceil(totalCount / limit);

    const result: Pagination = {
      page: Number(page),
      limit,
      offset,
      pageCount,
      totalCount,
    };

    return result;
  }
}
