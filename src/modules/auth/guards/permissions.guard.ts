import { FindUserByRoleService } from '@/modules/roles/services/find-user-by-role/find-user-by-role.service';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly findUserByRoleService: FindUserByRoleService,
  ) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!permissions) {
      return true;
    }

    const { user, headers } = context.switchToHttp().getRequest<Request>();

    if (!user) {
      throw new BadRequestException(
        'The property the user of the request is not correctly named or undefined.',
      );
    }
    const role = headers['x-role'];

    if (!role) {
      throw new BadRequestException('Role must be informed');
    }

    const loadUserByRole = await this.findUserByRoleService.findUserByRole(
      user.id,
    );

    const hasRole = (): string =>
      loadUserByRole.find((roles) => roles === role);

    const hasPermission = (): string =>
      permissions.find((per) => per === hasRole());

    if (hasPermission() && hasRole()) return true;

    throw new ForbiddenException(
      'Role does not have permissions to access this endpoint',
    );
  }
}
