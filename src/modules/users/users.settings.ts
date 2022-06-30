import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { UserEntity } from '@/infra/typeorm/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users.repository';
import { AddUserService } from './services/add-user/add-user.service';
import { FindUserByIdService } from './services/find-user-by-id/find-user-by-id.service';
import { FindUsersService } from './services/find-users/find-users.service';
import { FindUserByEmailService } from './services/find-user-by-email/find-user-by-email.service';
import { UpdateUserService } from './services/update-user/update-user.service';
import { DeleteUserService } from './services/delete-user/delete-user.service';
import { FindUsersWithPaginationService } from './services/find-users-with-pagination/find-users-with-pagination.service';
import { CalculateOffsetService } from '@/shared/pagination/services/calculate-offset/calculate-offset.service';
import { BuildPaginationService } from '@/shared/pagination/services/build-pagination/build-pagination.service';
import { RoleEntity } from '@/infra/typeorm/entities/role-entity/role-entity';
import { FindUserByRoleService } from '../roles/services/find-user-by-role/find-user-by-role.service';
import { RolesRepository } from '../roles/repositories/roles.repository';

export const imports = [
  TypeOrmModule.forFeature([
    UserEntity,
    UsersRepository,
    RoleEntity,
    RolesRepository,
  ]),
];

export const providers = [
  AddUserService,
  FindUserByIdService,
  BcryptAdapter,
  FindUsersService,
  FindUserByEmailService,
  UpdateUserService,
  DeleteUserService,
  FindUsersWithPaginationService,
  CalculateOffsetService,
  BuildPaginationService,
  FindUserByRoleService,
];

export const controllers = [UsersController];
