import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permisson } from 'src/permissions/permissons.entity';
import { Role } from 'src/roles/roles.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permisson)
    private readonly permissionRepository: Repository<Permisson>,
  ) {}

  async onModuleInit() {
    await this.seedPermission();
    await this.seedRole();
    await this.seedAdmin();
  }

  private async seedPermission() {
    const permissonNames = ['GET', 'CREATE', 'UPDATE', 'DELETE'];

    for (const name of permissonNames) {
      const exist = await this.permissionRepository.findOne({
        where: { name: name },
      });
      if (!exist) {
        await this.permissionRepository.save(
          this.permissionRepository.create({ name }),
        );
        console.log(`Permisson "${name}" created`);
      }
    }
  }

  private async seedRole() {
    const allPermisson = await this.permissionRepository.find();

    const userPermissonName = ['CREATE', 'UPDATE', 'GET', 'DELETE'];
    const userPermission = allPermisson.filter((p) =>
      userPermissonName.includes(p.name),
    );

    const roles = [
      {
        name: 'ADMIN',
        permissions: allPermisson,
      },
      {
        name: 'USER',
        permissions: userPermission,
      },
    ];

    for (const role of roles) {
      const exist = await this.roleRepository.findOne({
        where: { name: role.name },
      });

      if (!exist) {
        await this.roleRepository.save(this.roleRepository.create(role));
        console.log(`Role "${role.name}" created`);
      }
    }
  }

  private async seedAdmin() {
    const exist = await this.userRepository.findOne({
      where: { userName: '#admin' },
    });

    if (exist) return;

    const adminRole = await this.roleRepository.findOne({
      where: { name: 'ADMIN' },
    });

    if (!adminRole) {
      console.log('ADMIN Role is not exist');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin#123', 10);

    await this.userRepository.save(
      this.userRepository.create({
        userNickName: 'ADMIN',
        userName: '#admin',
        password: hashedPassword,
        roles: [adminRole],
      }),
    );

    console.log('admin has been created');
  }
}
