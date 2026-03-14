import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permisson } from './permissons.entity';
import { CreatePermissonRequest } from './dto/create-permission.dto';
import { UpdatePermissionRequest } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permisson)
    private readonly permissonRepository: Repository<Permisson>,
  ) {}

  createPermisson(createPermisson: CreatePermissonRequest) {
    const newPer = this.permissonRepository.create(createPermisson);
    return this.permissonRepository.save(newPer);
  }

  updatePermisson(
    permissonId: string,
    updatePermisson: UpdatePermissionRequest,
  ) {
    return this.permissonRepository.update(permissonId, updatePermisson);
  }

  getPermisson(permissonId: string) {
    return this.permissonRepository.findOne({ where: { id: permissonId } });
  }

  getAllPermisson() {
    return this.permissonRepository.find();
  }

  deletePermisson(permissonId: string) {
    return this.permissonRepository.delete(permissonId);
  }
}
