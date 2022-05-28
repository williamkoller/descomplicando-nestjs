import { UserEntity } from '@/infra/typeorm/entities';

export interface Encrypter {
  encrypt: (user: UserEntity) => Promise<string>;
}
