import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fee')
export class Fee {
  @PrimaryGeneratedColumn('uuid')
  feeId: string;

  @IsNotEmpty()
  @MinLength(2, { message: 'name is too short' })
  @Column()
  feeName: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  feePrice: number;

  @Column()
  @IsString()
  feeDescription: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @Column()
  userId: string;

  @Column()
  @IsDateString()
  date: Date;
}
