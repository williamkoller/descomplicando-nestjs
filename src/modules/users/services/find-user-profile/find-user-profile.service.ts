import { UserEntity } from '@/infra/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { FindUserByIdService } from '../find-user-by-id/find-user-by-id.service';

@Injectable()
export class FindUserProfileService {
  constructor(private readonly findUserByIdService: FindUserByIdService) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.findUserByIdService.execute(id);

    delete user.password;

    return user;
  }
}
