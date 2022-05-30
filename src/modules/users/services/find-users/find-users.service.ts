import { UserEntity } from '@/infra/typeorm/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { usersTransform } from '@/modules/users/transform/user';

@Injectable()
export class FindUsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute(): Promise<UserEntity[]> {
    const users = await this.usersRepo.findAll();

    if (!users) {
      throw new NotFoundException('No record found.');
    }

    return usersTransform(users);
  }
}
