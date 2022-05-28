import { UserEntity } from '@/infra/typeorm/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users.repository';
import { AddUserService } from './services/add-user/add-user.service';
import { FindUserByIdService } from './services/find-user-by-id/find-user-by-id.service';

export const imports = [
  TypeOrmModule.forFeature([UserEntity, UsersRepository]),
];

export const providers = [AddUserService, FindUserByIdService];

export const controllers = [UsersController];
