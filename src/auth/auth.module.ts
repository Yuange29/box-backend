import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStratery } from './strateries/jwt.strateries';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPRIRES_IN') ?? ('1d' as any),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStratery, JwtRefreshAuthGuard],
})
export class AuthModule {}
