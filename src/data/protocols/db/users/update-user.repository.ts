import { UserEntity } from '@/infra/typeorm/entities';
import { UpdateUserDto } from '@/modules/users/dtos/update-user/update-user.dto';

export interface UpdateUserRepository {
  updateUser: (
    user: UserEntity,
    updateUserDto: UpdateUserDto,
  ) => Promise<UserEntity>;
}
