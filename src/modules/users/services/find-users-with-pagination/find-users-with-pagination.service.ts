import { UserEntity } from '@/infra/typeorm/entities';
import { ResultWithPagination } from '@/shared/pagination/interfaces/result-with-pagination.interface';
import { BuildPaginationService } from '@/shared/pagination/services/build-pagination/build-pagination.service';
import { CalculateOffsetService } from '@/shared/pagination/services/calculate-offset/calculate-offset.service';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { FilterUserDto } from '@/modules/users/dtos/filter-user/filter-user.dto';

@Injectable()
export class FindUsersWithPaginationService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly calculateOffset: CalculateOffsetService,
    private readonly buildPagination: BuildPaginationService,
  ) {}

  async findPagination(
    data: FilterUserDto,
  ): Promise<ResultWithPagination<UserEntity[]>> {
    const page = data.page ?? 1;
    const limit = data.limit ?? 10;

    const offset = this.calculateOffset.calculateOffset(page, limit);

    const [users, totalCount] = await this.usersRepo.findUserAndCount(
      offset,
      limit,
    );

    const pagination = this.buildPagination.buildPaginationObject({
      limit,
      offset,
      page,
      totalCount,
    });

    return {
      paged: pagination,
      result: users,
    };
  }
}
