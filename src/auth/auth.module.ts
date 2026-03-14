import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStratery } from './strateries/jwt.strateries';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtRefreshStratery } from './strateries/jwt-refresh.strateries';
import { Role } from 'src/roles/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_ACCESS') ?? ('1d' as any),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStratery, JwtRefreshStratery],
})
export class AuthModule {}
