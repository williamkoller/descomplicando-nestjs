import { UserEntity } from '@/infra/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '@/modules/users/dtos/update-user/update-user.dto';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { FindUserByIdService } from '@/modules/users/services/find-user-by-id/find-user-by-id.service';

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly findUserByIdService: FindUserByIdService,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findUserByIdService.execute(id);

    return await this.usersRepo.updateUser(user, updateUserDto);
  }
}
