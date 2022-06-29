import { BaseEntity } from '@/infra/typeorm/entities/base-entity/base.entity';
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { RoleEntity } from '../role-entity/role-entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  surname: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @OneToMany(() => RoleEntity, (role) => role.user, { eager: true })
  @JoinTable()
  roles: RoleEntity[];

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
