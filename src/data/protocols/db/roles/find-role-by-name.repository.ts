import { RoleEntity } from '@/infra/typeorm/entities/role-entity/role-entity';

export interface FindRoleByNameRepository {
  findByName: (name: string) => Promise<RoleEntity>;
}
