import { IsOptional, IsString } from 'class-validator';

export class CreatePermissonRequest {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
