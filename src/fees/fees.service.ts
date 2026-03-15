import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fee } from './fees.entity';
import { Repository } from 'typeorm';
import { CreateFeeRequest } from './dto/create-fee.dto';
import { UpdateFeeRequest } from './dto/update-fee.dto';
import { Category } from 'src/categories/categories.entity';

@Injectable()
export class FeesService {
  constructor(
    @InjectRepository(Fee)
    private readonly feeRepository: Repository<Fee>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createFee(userId: string, createFeeRequest: CreateFeeRequest) {
    const exist = this.categoryRepository.findOne({
      where: { categoryName: createFeeRequest.categoryName },
    });

    if (!exist) throw new NotFoundException('Not found category');

    const fee = this.feeRepository.create({
      ...createFeeRequest,
      userId: userId,
    });

    return await this.feeRepository.save(fee);
  }

  async updateFee(feeId: string, updateRequest: UpdateFeeRequest) {
    return this.feeRepository.update(feeId, updateRequest);
  }

  async getUserFee(userId: string) {
    return await this.feeRepository.find({ where: { userId: userId } });
  }

  async deleteFee(feeId: string) {
    return this.feeRepository.delete(feeId);
  }
}
