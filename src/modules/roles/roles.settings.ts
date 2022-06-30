import { RoleEntity } from '@/infra/typeorm/entities/role-entity/role-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { FindUserByIdService } from '@/modules//users/services/find-user-by-id/find-user-by-id.service';
import { RolesController } from './controllers/roles.controller';
import { RolesRepository } from './repositories/roles.repository';
import { AddRoleService } from './services/add-role/add-role.service';
import { FindRoleByNameService } from './services/find-role-by-name/find-role-by-name.service';
import { FindUserByRoleService } from './services/find-user-by-role/find-user-by-role.service';

export const imports = [
  TypeOrmModule.forFeature([RoleEntity, RolesRepository, UsersRepository]),
];
export const providers = [
  FindRoleByNameService,
  AddRoleService,
  FindUserByIdService,
  FindUserByRoleService,
];
export const controllers = [RolesController];
