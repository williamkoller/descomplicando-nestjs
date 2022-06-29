import { RoleEntity } from '@/infra/typeorm/entities/role-entity/role-entity';
import { AddRoleDto } from '@/modules/roles/dtos/add-role/add-role.dto'

export interface AddRoleRepository {
  add: (data: AddRoleDto) => Promise<RoleEntity>;
}
