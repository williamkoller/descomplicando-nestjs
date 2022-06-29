import { RoleEntity } from '@/infra/typeorm/entities/role-entity/role-entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { RolesRepository } from '@/modules/roles/repositories/roles.repository';

@Injectable()
export class FindRoleByNameService {
  constructor(private readonly rolesRepo: RolesRepository) {}

  async findByName(name: string): Promise<RoleEntity> {
    const role = await this.rolesRepo.findByName(name);

    if (role) {
      throw new ConflictException('there is already a role with this name.');
    }

    return role;
  }
}
