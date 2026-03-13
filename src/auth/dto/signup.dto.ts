import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';

export class SignUp {
  @IsNotEmpty()
  @MinLength(3, { message: 'Trống tên' })
  userNickName: string;

  @IsNotEmpty({ message: 'Trống tên đăng nhập hoặc tài khoản' })
  @MinLength(6, { message: 'Tên đăng nhập ít nhất có 6 kí tự' })
  @IsString()
  userName: string;

  @IsNotEmpty()
  @MinLength(2, { message: 'Mật khẩu phải có ít nhất 6 kí tự' })
  password: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;
}
