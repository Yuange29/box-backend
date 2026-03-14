import {
  ConflictException,
  Injectable,
  NotFoundException,
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
import { Role } from 'src/roles/roles.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signup: SignUp) {
    const exit = await this.userRepository.findOne({
      where: { userName: signup.userName },
    });

    if (exit) throw new ConflictException('tên đăng nhập đã tồn tại');

    const userRole = await this.roleRepository.findOne({
      where: { name: 'USER' },
    });

    if (!userRole) throw new NotFoundException('Role USER is not exist');

    const hassedPassword = await bcrypt.hash(signup.password, 10);

    const newUser = this.userRepository.create({
      ...signup,
      password: hassedPassword,
      roles: [userRole],
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
    const userWithRole = await this.userRepository.findOne({
      where: { userId: user.userId },
      relations: ['roles'],
    });

    const roles = userWithRole?.roles?.map((r) => r.name) ?? [];

    const payload = { sub: user.userId, name: user.userName, roles: roles };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET')!,
        expiresIn:
          this.configService.get<string>('JWT_EXPIRES_ACCESS') ??
          ('15m' as any),
      }),

      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET')!,
        expiresIn:
          this.configService.get<string>('JWT_EXPIRES_REFRESH') ??
          ('7d' as any),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
