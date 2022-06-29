import { Module } from '@nestjs/common';
import { imports, providers, controllers } from './roles.settings';

@Module({
  imports,
  providers,
  controllers,
})
export class RolesModule {}
