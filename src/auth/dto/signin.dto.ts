import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignIn {
  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  userName: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
