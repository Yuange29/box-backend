import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permisson } from './permissons.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permisson])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
