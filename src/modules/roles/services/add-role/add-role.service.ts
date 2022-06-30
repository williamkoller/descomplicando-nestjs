import { RoleEntity } from '@/infra/typeorm/entities/role-entity/role-entity';
import { AddRoleDto } from '@/modules/roles/dtos/add-role/add-role.dto';
import { RolesRepository } from '@/modules/roles/repositories/roles.repository';
import { FindRoleByNameService } from '@/modules/roles/services/find-role-by-name/find-role-by-name.service';
import { FindUserByIdService } from '@/modules/users/services/find-user-by-id/find-user-by-id.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddRoleService {
  constructor(
    private readonly rolesRepo: RolesRepository,
    private readonly findRoleByNameService: FindRoleByNameService,
    private readonly findUserByIdService: FindUserByIdService,
  ) {}

  async addRole(data: AddRoleDto): Promise<RoleEntity> {
    await this.findRoleByNameService.findByName(data.name);
    await this.findUserByIdService.execute(data.userId);
    return await this.rolesRepo.add(data);
  }
}
