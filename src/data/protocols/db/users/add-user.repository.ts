import { UserEntity } from '@/infra/typeorm/entities';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';

export interface AddUserRepository {
  add: (data: AddUserDto) => Promise<UserEntity>;
}
