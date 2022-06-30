import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthInputDto } from '@/modules/auth/dtos/auth-input/auth-input.dto';
import { AuthService } from '@/modules/auth/services/auth.service';
import { JwtAuthGuard } from '@/modules/auth/guards/auth.guard';
import { UserEntity } from '@/infra/typeorm/entities';
import { FindUserProfileService } from '@/modules/users/services/find-user-profile/find-user-profile.service';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly findUserProfileService: FindUserProfileService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'sign In',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'user unauthorized.',
  })
  public async login(
    @Body() authInputDto: AuthInputDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.login(authInputDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Load my user.',
  })
  public async me(@Req() request: Request): Promise<UserEntity> {
    try {
      return await this.findUserProfileService.execute(request.user.id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
