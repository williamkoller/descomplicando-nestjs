import {
  AddRoleRepository,
  FindRoleByNameRepository,
} from '@/data/protocols/db/roles';
import { RoleEntity } from '@/infra/typeorm/entities/role-entity/role-entity';
import { EntityRepository, Repository } from 'typeorm';
import { AddRoleDto } from '@/modules/roles/dtos/add-role/add-role.dto';

@EntityRepository(RoleEntity)
export class RolesRepository
  extends Repository<RoleEntity>
  implements AddRoleRepository, FindRoleByNameRepository
{
  async add(data: AddRoleDto): Promise<RoleEntity> {
    const createRole = Object.assign({} as AddRoleDto, data);
    return await this.save(createRole);
  }

  async findByName(name: string): Promise<RoleEntity> {
    return await this.createQueryBuilder('roles')
      .where(`(roles.name ILIKE :name)`, { name: `%${name}%` })
      .getOne();
  }
}
