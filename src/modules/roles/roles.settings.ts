import { RoleEntity } from '@/infra/typeorm/entities/role-entity/role-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/repositories/users.repository';
import { FindUserByIdService } from '../users/services/find-user-by-id/find-user-by-id.service';
import { RolesController } from './controllers/roles.controller';
import { RolesRepository } from './repositories/roles.repository';
import { AddRoleService } from './services/add-role/add-role.service';
import { FindRoleByNameService } from './services/find-role-by-name/find-role-by-name.service';

export const imports = [
  TypeOrmModule.forFeature([RoleEntity, RolesRepository, UsersRepository]),
];
export const providers = [
  FindRoleByNameService,
  AddRoleService,
  FindUserByIdService,
];
export const controllers = [RolesController];
