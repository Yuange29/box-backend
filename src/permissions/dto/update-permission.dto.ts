import { IsOptional, IsString } from 'class-validator';

export class UpdatePermissionRequest {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
