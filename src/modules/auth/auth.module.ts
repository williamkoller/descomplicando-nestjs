import { Module } from '@nestjs/common';
import { imports, providers, controllers } from './auth.settings';

@Module({
  imports,
  providers,
  controllers,
})
export class AuthModule {}
