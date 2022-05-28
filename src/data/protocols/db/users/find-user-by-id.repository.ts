import { UserEntity } from '@/infra/typeorm/entities';

export interface FindUserByIdRepository {
  findUserById: (id: string) => Promise<UserEntity>;
}
