import { RoleEntity } from '@/infra/typeorm/entities/role-entity/role-entity';

export const roleTransfomer = (role: RoleEntity): RoleEntity => {
  return {
    id: role.id,
    name: role.name,
    description: role.description,
    permissions: role.permissions.map((permission) => permission),
    userId: role.userId,
    createdAt: role.createdAt,
    updatedAt: role.updatedAt,
  };
};
