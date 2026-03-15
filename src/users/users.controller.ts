import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreationRequest } from './dto/UserCreationRequest.dto';
import { UserUpdateRequest } from './dto/UserUpdateRequest.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RoleGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Roles('ADMIN')
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get('me')
  @Roles('USER', 'ADMIN')
  getUser(@CurrentUser() user: { userId: string }) {
    return this.userService.findUserById(user.userId);
  }

  @Post()
  @Roles('USER', 'ADMIN')
  createUser(@Body() createUserRequest: UserCreationRequest) {
    return this.userService.createUser(createUserRequest);
  }

  @Patch(':userId')
  @Roles('USER', 'ADMIN')
  updateUser(
    @Param('userId') userId: string,
    @Body() userUpdateRequest: UserUpdateRequest,
  ) {
    return this.userService.updateUser(userId, userUpdateRequest);
  }

  @Delete(':userId')
  @Roles('USER', 'ADMIN')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
