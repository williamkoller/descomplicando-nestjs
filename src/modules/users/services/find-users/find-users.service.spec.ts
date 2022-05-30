import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { FindUsersService } from './find-users.service';
import { UserEntity } from '@/infra/typeorm/entities';

describe('FindUsersService', () => {
  let findUsersService: FindUsersService;
  let usersRepo: UsersRepository;
  let mockData;

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
    mockData = [
      {
        id: 'any_id',
        name: 'any_name',
        surname: 'any_surname',
        email: 'valid@mail.com',
        password: 'any_password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ] as UserEntity[];
  });

  it('should be defined', () => {
    expect(findUsersService).toBeDefined();
  });

  it('should be return repository return', async () => {
    (usersRepo.findAll as jest.Mock).mockReturnValue(mockData);
    expect(await usersRepo.findAll()).toEqual(mockData);
  });
});
