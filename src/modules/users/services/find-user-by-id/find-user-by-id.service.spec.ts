import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { FindUserByIdService } from './find-user-by-id.service';

describe('FindUserByIdService', () => {
  let findUserByIdService: FindUserByIdService;
  let usersRepo: UsersRepository;

  beforeEach(async () => {
    const usersRepositoryMock = {
      findUserById: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdService,
        {
          provide: UsersRepository,
          useFactory: () => usersRepositoryMock,
        },
      ],
    }).compile();

    findUserByIdService = module.get<FindUserByIdService>(FindUserByIdService);
    usersRepo = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(findUserByIdService).toBeDefined();
  });
});
