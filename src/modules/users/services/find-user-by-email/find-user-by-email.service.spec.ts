import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { FindUserByEmailService } from './find-user-by-email.service';

describe('FindUserByEmailService', () => {
  let findUserEmailService: FindUserByEmailService;
  let usersRepo: UsersRepository;

  beforeEach(async () => {
    const usersRepositoryMock = {
      findUserByEmail: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByEmailService,
        {
          provide: UsersRepository,
          useFactory: () => usersRepositoryMock,
        },
      ],
    }).compile();

    findUserEmailService = module.get<FindUserByEmailService>(
      FindUserByEmailService,
    );
    usersRepo = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(findUserEmailService).toBeDefined();
  });
});
