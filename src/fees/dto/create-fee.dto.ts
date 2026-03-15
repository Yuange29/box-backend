import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFeeRequest {
  @IsString()
  @IsNotEmpty()
  feeName: string;

  @IsNotEmpty()
  feePrice: number;

  @IsString()
  @IsOptional()
  feeDescription: string;

  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @IsDateString()
  date: Date;
}
