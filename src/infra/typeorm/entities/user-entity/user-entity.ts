import { BaseEntity } from '@/infra/typeorm/entities/base-entity/base.entity';
import { Column, Entity } from 'typeorm';

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

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
