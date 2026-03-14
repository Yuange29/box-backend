import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { In, Repository } from 'typeorm';
import { RoleCreationRequest } from './dto/RoleCreationRequest.dto';
import { Permisson } from 'src/permissions/permissons.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permisson)
    private readonly permissonRepository: Repository<Permisson>,
  ) {}

  async createRole(createRoleRequest: RoleCreationRequest) {
    const permissons = await this.permissonRepository.findBy({
      name: In(createRoleRequest.permissionNames),
    });

    const role = this.roleRepository.create({
      name: createRoleRequest.name,
      permissons,
    });

    return this.roleRepository.save(role);
  }

  getRole(roleName: string) {
    return this.roleRepository.findOne({ where: { name: roleName } });
  }

  getAllRole() {
    return this.roleRepository.find();
  }

  deleteRole(roleName: string) {
    return this.roleRepository.delete(roleName);
  }
}
