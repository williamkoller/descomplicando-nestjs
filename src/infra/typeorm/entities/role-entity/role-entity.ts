import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base-entity/base.entity';
import { UserEntity } from '../user-entity/user-entity';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'text', array: true })
  permissions: string[];

  @Column({ type: 'uuid', nullable: true })
  userId?: string;

  @ManyToOne(() => UserEntity, (user) => user.roles, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  user?: UserEntity;

  constructor(partial: Partial<RoleEntity>) {
    super();
    Object.assign(this, partial);
  }
}
