import { AddUserService } from './add-user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';

describe('AddUserService', () => {
  let addUserService: AddUserService;
  let usersRepo: UsersRepository;

  beforeEach(async () => {
    const usersRepositoryMock = {
      add: jest.fn(),
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
  });

  it('should be defined', () => {
    expect(addUserService).toBeDefined();
  });
});
