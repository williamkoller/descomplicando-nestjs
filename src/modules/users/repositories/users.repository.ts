import {
  AddUserRepository,
  FindUserByNameRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
  FindUsersRepository,
} from '@/data/protocols/db/users';
import { UserEntity } from '@/infra/typeorm/entities';
import { EntityRepository, Repository } from 'typeorm';
import { AddUserDto } from '../dtos/add-user/add-user.dto';

@EntityRepository(UserEntity)
export class UsersRepository
  extends Repository<UserEntity>
  implements
    AddUserRepository,
    FindUserByNameRepository,
    FindUserByEmailRepository,
    FindUserByIdRepository,
    FindUsersRepository
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
    return await this.findOne({ email });
  }

  async findUserById(id: string): Promise<UserEntity> {
    return await this.findOne({ id });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.find();
  }
}
