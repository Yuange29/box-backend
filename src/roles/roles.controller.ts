import {
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleCreationRequest } from './dto/RoleCreationRequest.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles('ADMIN')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Post()
  createRole(@Body() roleCreationRequest: RoleCreationRequest) {
    return this.roleService.createRole(roleCreationRequest);
  }

  @Get(':roleName')
  getRole(@Param('roleName') roleName: string) {
    return this.roleService.getRole(roleName);
  }

  @Get()
  getAllRole() {
    return this.roleService.getAllRole();
  }

  @Delete(':roleName')
  deleteRole(@Param('roleName') roleName: string) {
    return this.roleService.deleteRole(roleName);
  }
}
