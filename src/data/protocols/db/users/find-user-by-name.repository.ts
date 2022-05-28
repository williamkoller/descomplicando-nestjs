import { UserEntity } from '@/infra/typeorm/entities';

export interface FindUserByNameRepository {
  findUserByName: (name: string) => Promise<UserEntity[]>;
}
