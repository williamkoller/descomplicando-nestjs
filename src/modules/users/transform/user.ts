import { UserEntity } from '@/infra/typeorm/entities';
import { UserType } from '@/modules/users/types/user.type';

export const userTransform = (user: UserEntity): UserType => {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: user.password,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    roles: user.roles.map((role) => role),
  };
};

export const usersTransform = (users: UserEntity[]): UserType[] => {
  return users.map(userTransform);
};
