import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { SignUp } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { SignIn } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signup: SignUp) {
    const exit = await this.userRepository.findOne({
      where: { userName: signup.userName },
    });

    if (!exit) throw new ConflictException('Không tìm được người dùng');

    const hassedPassword = await bcrypt.hash(signup.password, 10);

    const newUser = this.userRepository.create({
      ...signup,
      password: hassedPassword,
    });

    await this.userRepository.save(newUser);

    return { message: 'success' };
  }

  async signIn(signIn: SignIn) {
    const user = await this.userRepository.findOne({
      where: { userName: signIn.userName },
    });

    if (!user)
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu sai');

    const isMatch = await bcrypt.compare(signIn.password, user.password);
    if (!isMatch)
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu sai');

    const token = await this.generateToken(user);

    const hashRefresh = await bcrypt.hash(token.refreshToken, 10);

    await this.userRepository.update(user.userId, {
      refreshToken: hashRefresh,
    });

    return token;
  }

  async logOut(userId: string) {
    await this.userRepository.update(userId, { refreshToken: null });
    return { message: 'success' };
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });

    if (!user || !user.refreshToken) throw new UnauthorizedException('Từ chối');

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) throw new UnauthorizedException('Từ chối');

    const token = await this.generateToken(user);

    const hashedRefresh = await bcrypt.hash(token.refreshToken, 10);
    await this.userRepository.update(userId, { refreshToken: hashedRefresh });

    return token;
  }

  private async generateToken(user: User) {
    const payload = { sub: user.userId, name: user.userName };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET')!,
        expiresIn: '15m',
      }),

      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET')!,
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
