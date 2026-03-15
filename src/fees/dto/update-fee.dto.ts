import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateFeeRequest {
  @IsString()
  @IsNotEmpty()
  feeName?: string;

  @IsString()
  @IsNotEmpty()
  feePrice?: number;

  @IsString()
  @IsOptional()
  feeDescription?: string;

  @IsNotEmpty()
  @IsString()
  categoryName?: string;

  @IsDate()
  date?: Date;
}
