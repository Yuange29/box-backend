import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UserUpdateRequest {
  @IsOptional()
  @MinLength(3)
  userNickName?: string;

  @IsOptional()
  @MinLength(6)
  @IsString()
  userName?: string;

  @IsOptional()
  @MinLength(2)
  password?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
