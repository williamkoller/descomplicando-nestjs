import { UserEntity } from '@/infra/typeorm/entities';

export interface FindUsersRepository {
  findAll: () => Promise<UserEntity[]>;
}
