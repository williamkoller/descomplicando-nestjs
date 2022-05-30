import { AddUserService } from './add-user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { UserEntity } from '@/infra/typeorm/entities';
import { ConflictException } from '@nestjs/common';

describe('AddUserService', () => {
  let addUserService: AddUserService;
  let usersRepo: UsersRepository;
  let mockData: UserEntity;

  beforeEach(async () => {
    const usersRepositoryMock = {
      add: jest.fn(),
      findUserByEmail: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddUserService,
        BcryptAdapter,
        {
          provide: UsersRepository,
          useFactory: () => usersRepositoryMock,
        },
      ],
    }).compile();

    addUserService = module.get<AddUserService>(AddUserService);
    usersRepo = module.get<UsersRepository>(UsersRepository);
    mockData = {
      id: 'any_id',
      name: 'any_name',
      surname: 'any_surname',
      email: 'valid@mail.com',
      password: 'any_password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(addUserService).toBeDefined();
  });

  it('should be called repository with correct params', async () => {
    (usersRepo.add as jest.Mock).mockReturnValue(mockData);

    expect(await addUserService.execute(mockData)).toEqual(mockData);
  });

  it('should be throw if user not found', async () => {
    (usersRepo.findUserByEmail as jest.Mock).mockRejectedValue(
      new ConflictException('This email is already in use.'),
    );

    mockData.email = 'valid@mail.com';
    await expect(addUserService.execute(mockData)).rejects.toThrow(
      new ConflictException('This email is already in use.'),
    );
  });
});
