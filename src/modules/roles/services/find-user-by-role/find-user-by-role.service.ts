import { FindUserByIdService } from '@/modules/users/services/find-user-by-id/find-user-by-id.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RolesRepository } from '@/modules/roles/repositories/roles.repository';

@Injectable()
export class FindUserByRoleService {
  constructor(
    private readonly findUserByIdService: FindUserByIdService,
    private readonly rolesRepo: RolesRepository,
  ) {}

  async findUserByRole(id: string): Promise<string[]> {
    const user = await this.findUserByIdService.execute(id);
    if (!user.roles) {
      throw new NotFoundException('there is no role for this user.');
    }
    return await this.rolesRepo.findRolePermissions(user.id);
  }
}
