import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissonRequest } from './dto/create-permission.dto';
import { UpdatePermissionRequest } from './dto/update-permission.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RoleGuard)
@Roles('ADMIN')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissonService: PermissionsService) {}

  @Get(':permissonId')
  getPermisson(@Param('permissonId') permissonId: string) {
    return this.permissonService.getPermisson(permissonId);
  }

  @Get()
  getAllPermisson() {
    return this.permissonService.getAllPermisson();
  }

  @Post()
  createNewPermisson(@Body() permissonCreateRequest: CreatePermissonRequest) {
    return this.permissonService.createPermisson(permissonCreateRequest);
  }

  @Patch(':permissonId')
  updatePermission(
    @Param('permissonId') permissonId: string,
    @Body() updatePermissonRequest: UpdatePermissionRequest,
  ) {
    return this.permissonService.updatePermisson(
      permissonId,
      updatePermissonRequest,
    );
  }

  @Delete(':permissonId')
  deletePermisson(@Param('permissonId') permissonId: string) {
    return this.permissonService.deletePermisson(permissonId);
  }
}
