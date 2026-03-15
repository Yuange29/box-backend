import { Module } from '@nestjs/common';
import { FeesController } from './fees.controller';
import { FeesService } from './fees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fee } from './fees.entity';
import { Category } from 'src/categories/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fee, Category])],
  controllers: [FeesController],
  providers: [FeesService],
})
export class FeesModule {}
