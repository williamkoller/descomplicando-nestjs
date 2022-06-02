import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { FindUserByIdService } from '@/modules/users/services/find-user-by-id/find-user-by-id.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly findUserByIdService: FindUserByIdService,
  ) {}

  async execute(id: string): Promise<void> {
    const { id: userId } = await this.findUserByIdService.execute(id);
    return await this.usersRepo.deleteUser(userId);
  }
}
