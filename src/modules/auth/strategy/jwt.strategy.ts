import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPayloadType } from '@/modules/auth/types/auth-payload/auth-payload.type';
import { UserEntity } from '@/infra/typeorm/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(JwtStrategy.name);
  constructor(private readonly usersRepo: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate(authPayloadType: AuthPayloadType): Promise<UserEntity> {
    this.logger.log(`JwtStrategy => ${JSON.stringify(authPayloadType)}`);
    const user = await this.usersRepo.findUserById(authPayloadType.id);

    const validUser = async (): Promise<boolean> =>
      user.id == authPayloadType.id;

    if (!user && validUser()) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
