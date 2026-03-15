import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCategoryRequest {
  @IsString()
  @MinLength(2, { message: 'min lenght is 2' })
  categoryName?: string;

  @IsOptional()
  categoryDescription?: string;
}
