import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UserUpdateRequest {
  @IsOptional()
  @MinLength(3)
  userNickName?: string;

  @IsOptional()
  @MinLength(2)
  password?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roleNames?: string[];
}
