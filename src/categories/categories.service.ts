import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryRequest } from './dto/create-category.dto';
import { UpdateCategoryRequest } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getUserCategory(userId: string) {
    return this.categoryRepository.find({ where: { userId: userId } });
  }

  async createCategory(userId: string, createRequest: CreateCategoryRequest) {
    const exist = await this.categoryRepository.findOne({
      where: {
        categoryName: createRequest.categoryName,
        userId: userId,
      },
    });

    if (exist) throw new ConflictException('Category is exist');

    const category = this.categoryRepository.create({
      ...createRequest,
      userId: userId,
    });

    return this.categoryRepository.save(category);
  }

  async updateCategory(
    categoryId: string,
    updateRequest: UpdateCategoryRequest,
  ) {
    const exist = await this.categoryRepository.findOne({
      where: { categoryId: categoryId },
    });

    if (!exist) throw new NotFoundException('Category is not exist');

    return this.categoryRepository.update(categoryId, updateRequest);
  }

  async deleteCategory(categoryId: string) {
    return this.categoryRepository.delete(categoryId);
  }
}
