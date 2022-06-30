import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter';
import { UserEntity } from '@/infra/typeorm/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { FindUserByEmailService } from '@/modules/users/services/find-user-by-email/find-user-by-email.service';
import { FindUserByIdService } from '@/modules/users/services/find-user-by-id/find-user-by-id.service';
import { FindUserProfileService } from '@/modules/users/services/find-user-profile/find-user-profile.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

export const imports = [
  TypeOrmModule.forFeature([UserEntity, UsersRepository]),

  PassportModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      defaultStrategy: configService.get<string>('defaultStrategy'),
      property: configService.get<string>('property'),
      session: configService.get<string>('session'),
    }),
  }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('secret'),
      signOptions: {
        expiresIn: configService.get('expiresIn'),
      },
    }),
  }),
];
export const providers = [
  JwtStrategy,
  AuthService,
  JwtAdapter,
  BcryptAdapter,
  FindUserByEmailService,
  FindUserProfileService,
  FindUserByIdService,
];
export const controllers = [AuthController];
