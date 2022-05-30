import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { UserEntity } from '@/infra/typeorm/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users.repository';
import { AddUserService } from './services/add-user/add-user.service';
import { FindUserByIdService } from './services/find-user-by-id/find-user-by-id.service';
import { FindUsersService } from './services/find-users/find-users.service';

export const imports = [
  TypeOrmModule.forFeature([UserEntity, UsersRepository]),
];

export const providers = [
  AddUserService,
  FindUserByIdService,
  BcryptAdapter,
  FindUsersService,
];

export const controllers = [UsersController];
