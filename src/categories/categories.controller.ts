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
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { CreateCategoryRequest } from './dto/create-category.dto';
import { UpdateCategoryRequest } from './dto/update-category.dto';

@Controller('categories')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles('USER', 'ADMIN')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  getUserCategory(@CurrentUser() user: { userId: string }) {
    return this.categoryService.getUserCategory(user.userId);
  }

  @Post()
  createCategory(
    @CurrentUser() user: { userId: string },
    @Body() request: CreateCategoryRequest,
  ) {
    return this.categoryService.createCategory(user.userId, request);
  }

  @Patch(':categoryId')
  updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() request: UpdateCategoryRequest,
  ) {
    return this.categoryService.updateCategory(categoryId, request);
  }

  @Delete(':categoryId')
  deleteCategory(@Param('categoryId') categoryId: string) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
