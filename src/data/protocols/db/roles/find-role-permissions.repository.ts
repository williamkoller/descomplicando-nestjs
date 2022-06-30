export interface FindRolePermissionsRepository {
  findRolePermissions: (userId: string) => Promise<string[]>;
}
