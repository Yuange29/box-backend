import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { Permisson } from 'src/permissions/permissons.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([Permisson]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
