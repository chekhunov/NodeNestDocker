import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}

    //dto обьект с полями
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue("USER")
    //$set() позволяет перезаписать поле и обновить сразу в базе эта функция ассинхронная поэтому add await
    await user.$set('roles', [role.id])
    return user;
  }

  async getAllUsers() {
    //all: true все поля которые связанны с пользователями будут подтягиваться
    const users = await this.userRepository.findAll({ include: { all: true}})
    return users;
  }
}
