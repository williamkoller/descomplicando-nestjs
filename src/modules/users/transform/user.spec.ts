import { UserEntity } from '@/infra/typeorm/entities';
import { userTransform } from './user';

const makeUser = (): UserEntity => {
  return {
    id: 'any_id',
    name: 'any_name',
    surname: 'any_surname',
    email: 'valid@mail.com',
    password: 'any_password',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

describe('User Transform', () => {
  it('should transform user to output', () => {
    const user: UserEntity = makeUser();

    const actual = userTransform(user);

    expect(actual.id).toBe(user.id);
    expect(actual.name).toBe(user.name);
    expect(actual.surname).toBe(user.surname);
    expect(actual.email).toBe(user.email);
    expect(actual.password).toBe(user.password);
    expect(actual.createdAt).toBe(user.createdAt);
    expect(actual.updatedAt).toBe(user.updatedAt);
  });
});
