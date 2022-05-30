import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { userTransform } from '@/modules/users/transform/user';
import { UserType } from '@/modules/users/types/user.type';

@Injectable()
export class FindUserByEmailService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute(email: string): Promise<UserType> {
    const user = await this.usersRepo.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return userTransform(user);
  }
}
