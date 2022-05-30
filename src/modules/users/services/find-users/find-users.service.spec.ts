import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { FindUsersService } from './find-users.service';

describe('FindUsersService', () => {
  let findUsersService: FindUsersService;
  let usersRepo: UsersRepository;

  beforeEach(async () => {
    const usersRepositoryMock = {
      findAll: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUsersService,
        {
          provide: UsersRepository,
          useFactory: () => usersRepositoryMock,
        },
      ],
    }).compile();

    findUsersService = module.get<FindUsersService>(FindUsersService);
    usersRepo = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(findUsersService).toBeDefined();
  });
});
