import { UserEntity } from '@/infra/typeorm/entities';
import { usersTransform, userTransform } from './user';

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

  it('should transform users to output', () => {
    const users: UserEntity[] = [makeUser()];

    const actual = usersTransform(users);

    expect(actual.length).toBe(1);
    expect(actual[0].id).toBe(users[0].id);
    expect(actual[0].name).toBe(users[0].name);
    expect(actual[0].surname).toBe(users[0].surname);
    expect(actual[0].email).toBe(users[0].email);
    expect(actual[0].password).toBe(users[0].password);
    expect(actual[0].createdAt).toBe(users[0].createdAt);
    expect(actual[0].updatedAt).toBe(users[0].updatedAt);
  });
});
