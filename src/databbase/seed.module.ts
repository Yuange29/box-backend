import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permisson } from 'src/permissions/permissons.entity';
import { Role } from 'src/roles/roles.entity';
import { User } from 'src/users/user.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permisson])],
  providers: [SeedService],
})
export class SeedModule {}
