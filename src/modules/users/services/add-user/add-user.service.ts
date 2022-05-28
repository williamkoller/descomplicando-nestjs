import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { UserEntity } from '@/infra/typeorm/entities';

@Injectable()
export class AddUserService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async execute(data: AddUserDto): Promise<UserEntity> {
    const userFound = await this.usersRepo.findUserByEmail(data.email);

    if (userFound) {
      throw new ConflictException('This email is already in use.');
    }

    return await this.usersRepo.add(data);
  }
}
