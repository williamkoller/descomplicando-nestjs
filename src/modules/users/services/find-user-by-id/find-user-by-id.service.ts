import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { userTransform } from '@/modules/users/transform/user';
import { UserType } from '@/modules/users/types/user.type';

@Injectable()
export class FindUserByIdService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute(id: string): Promise<UserType> {
    const userFound = await this.usersRepo.findUserById(id);

    if (!userFound) {
      throw new NotFoundException('User not found.');
    }

    return userTransform(userFound);
  }
}
