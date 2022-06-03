import {
  AddUserRepository,
  FindUserByNameRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
  FindUsersRepository,
  DeleteUserRepository,
  UpdateUserRepository,
} from '@/data/protocols/db/users';
import { UserEntity } from '@/infra/typeorm/entities';
import { EntityRepository, Repository } from 'typeorm';
import { AddUserDto } from '../dtos/add-user/add-user.dto';
import { UpdateUserDto } from '../dtos/update-user/update-user.dto';

@EntityRepository(UserEntity)
export class UsersRepository
  extends Repository<UserEntity>
  implements
    AddUserRepository,
    FindUserByNameRepository,
    FindUserByEmailRepository,
    FindUserByIdRepository,
    FindUsersRepository,
    DeleteUserRepository,
    UpdateUserRepository
{
  async add(data: AddUserDto): Promise<UserEntity> {
    const userCreated = Object.assign({} as AddUserDto, data);
    return await this.save(userCreated);
  }

  async findUserByName(name: string): Promise<UserEntity[]> {
    return await this.createQueryBuilder('users')
      .where(`(users.name) ILIKE :name`, { name: `%${name}%` })
      .getMany();
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({ where: { email } });
  }

  async findUserById(id: string): Promise<UserEntity> {
    return await this.findOne({ id });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.find();
  }

  async deleteUser(id: string): Promise<void> {
    await this.delete(id);
  }

  async updateUser(
    user: UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const userUpdated = this.merge(user, { ...updateUserDto });
    return await this.save(userUpdated);
  }

  async findUserAndCount(
    offset: number,
    limit: number,
  ): Promise<[UserEntity[], number]> {
    return await this.findAndCount({ skip: offset, take: limit });
  }
}
