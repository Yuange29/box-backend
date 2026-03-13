import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserCreationRequest } from './dto/UserCreationRequest.dto';
import { UserUpdateRequest } from './dto/UserUpdateRequest.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findUserById(userId: string) {
    return this.userRepository.findOne({ where: { userId } });
  }

  createUser(userCreationRequest: UserCreationRequest) {
    const user = this.userRepository.create(userCreationRequest);
    return this.userRepository.save(user);
  }

  updateUser(userId: string, userUpdateRequest: UserUpdateRequest) {
    return this.userRepository.update(userId, userUpdateRequest);
  }

  deleteUser(userId: string) {
    return this.userRepository.delete(userId);
  }
}
