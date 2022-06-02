import envFolderPath, { envs } from '@/config/env';
import { forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@/modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '@/infra/typeorm/config/config.service';
import { AuthModule } from '@/modules/auth/auth.module';

export const imports = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: envFolderPath.folderPath,
    load: [envs],
  }),
  TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  forwardRef(() => UsersModule),
  forwardRef(() => AuthModule),
];
