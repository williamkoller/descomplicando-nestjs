import { RoleEntity } from '@/infra/typeorm/entities/role-entity/role-entity';

export type UserType = {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  roles: RoleEntity[];
};
