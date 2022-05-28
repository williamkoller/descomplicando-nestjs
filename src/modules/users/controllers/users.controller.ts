import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserDto } from '@/modules/users/dtos/add-user/add-user.dto';
import { AddUserService } from '@/modules/users/services/add-user/add-user.service';
import { FindUserByIdService } from '@/modules/users/services/find-user-by-id/find-user-by-id.service';
import { UserType } from '../types/user.type';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly addUserService: AddUserService,
    private readonly findUserByIdService: FindUserByIdService,
  ) {}

  @Post('sign-up')
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

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find user by id.',
  })
  async findById(@Param('id') id: string): Promise<UserType> {
    return await this.findUserByIdService.execute(id);
  }
}
