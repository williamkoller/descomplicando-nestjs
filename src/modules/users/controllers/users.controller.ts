import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { AddUserService } from '@/modules/users/services/add-user/add-user.service';
import { FindUserByIdService } from '@/modules/users/services/find-user-by-id/find-user-by-id.service';
import { UserType } from '@/modules/users/types/user.type';
import { FindUsersService } from '@/modules/users/services/find-users/find-users.service';
import { UserEntity } from '@/infra/typeorm/entities';
import { FindUserByEmailService } from '@/modules/users/services/find-user-by-email/find-user-by-email.service';
import { UpdateUserDto } from '@/modules/users/dtos/update-user/update-user.dto';
import { UpdateUserService } from '@/modules/users/services/update-user/update-user.service';
import { DeleteUserService } from '@/modules/users/services/delete-user/delete-user.service';
import { JwtAuthGuard } from '@/modules/auth/guards/auth.guard';
import { ValidationParamsPipe } from '@/common/pipes/validation-params.pipe';
import { FilterUserDto } from '@/modules/users/dtos/filter-user/filter-user.dto';
import { ResultWithPagination } from '@/shared/pagination/interfaces/result-with-pagination.interface';
import { FindUsersWithPaginationService } from '@/modules/users/services/find-users-with-pagination/find-users-with-pagination.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly addUserService: AddUserService,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly findUsersService: FindUsersService,
    private readonly findUserByEmailService: FindUserByEmailService,
    private readonly updatUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly findUserWithPagination: FindUsersWithPaginationService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'This email is already in use.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Add new User.',
  })
  async add(@Body() data: AddUserDto): Promise<UserType> {
    return await this.addUserService.execute(data);
  }

  @Get(':id/find-user-by-id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find user by id.',
  })
  async findById(@Param(ValidationParamsPipe) id: string): Promise<UserType> {
    return await this.findUserByIdService.execute(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No record found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find users.',
  })
  async find(): Promise<UserEntity[]> {
    return await this.findUsersService.execute();
  }

  @Get(':email/find-user-by-email')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find user by email.',
  })
  async findByEmail(
    @Param(ValidationParamsPipe) email: string,
  ): Promise<UserType> {
    return await this.findUserByEmailService.execute(email);
  }

  @Put(':id/update')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update user.',
  })
  async updateUser(
    @Param(ValidationParamsPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.updatUserService.execute(id, updateUserDto);
  }

  @Delete(':id/delete')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete user.',
  })
  async deleteUser(@Param(ValidationParamsPipe) id: string): Promise<void> {
    return await this.deleteUserService.execute(id);
  }

  @Get('find-users-with-pagination')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No record found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find users.',
  })
  async findUserWithPAgination(
    @Query(ValidationParamsPipe) data: FilterUserDto,
  ): Promise<ResultWithPagination<UserEntity[]>> {
    return await this.findUserWithPagination.findPagination(data);
  }
}
