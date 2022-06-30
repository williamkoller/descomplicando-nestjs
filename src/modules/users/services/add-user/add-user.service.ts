import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { UserType } from '@/modules/users/types/user.type';
import { userTransform } from '@/modules/users/transform/user';

@Injectable()
export class AddUserService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}

  async execute(data: AddUserDto): Promise<UserType> {
    const userFound = await this.usersRepo.findUserByEmail(data.email);

    if (userFound) {
      throw new ConflictException('This email is already in use.');
    }

    const newData = {
      ...data,
      password: await this.bcryptAdapter.hash(data.password),
    };

    const createdUser = await this.usersRepo.add(newData);

    return userTransform(createdUser);
  }
}
