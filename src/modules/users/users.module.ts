import { imports, providers, controllers } from './users.settings';
import { Module } from '@nestjs/common';

@Module({
  imports,
  controllers,
  providers,
})
export class UsersModule {}
