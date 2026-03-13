import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreationRequest } from './dto/UserCreationRequest.dto';
import { UserUpdateRequest } from './dto/UserUpdateRequest.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.userService.findUserById(userId);
  }

  @Post()
  createUser(@Body() createUserRequest: UserCreationRequest) {
    return this.userService.createUser(createUserRequest);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() userUpdateRequest: UserUpdateRequest,
  ) {
    return this.userService.updateUser(userId, userUpdateRequest);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
