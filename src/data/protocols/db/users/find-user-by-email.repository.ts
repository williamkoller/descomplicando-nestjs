import { UserEntity } from '@/infra/typeorm/entities';

export class FindUserByEmailRepository {
  findUserByEmail: (email: string) => Promise<UserEntity>;
}
