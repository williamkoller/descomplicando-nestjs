import { RoleEntity } from '@/infra/typeorm/entities/role-entity/role-entity';
import { JwtAuthGuard } from '@/modules/auth/guards/auth.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddRoleDto } from '../dtos/add-role/add-role.dto';
import { AddRoleService } from '../services/add-role/add-role.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly addRoleService: AddRoleService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'there is already a role with this name.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Add new role.',
  })
  async add(@Body() data: AddRoleDto): Promise<RoleEntity> {
    const role = await this.addRoleService.addRole(data);
    return role;
  }
}
