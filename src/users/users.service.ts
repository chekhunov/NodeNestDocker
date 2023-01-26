import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}

    //dto обьект с полями
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue("ADMIN")
    //$set() позволяет перезаписать поле и обновить сразу в базе эта функция ассинхронная поэтому add await
    await user.$set('roles', [role.id])
    //вручную добавим поле ролей в ответ запроса
    user.roles = [role]
    return user;
  }

  async getAllUsers() {
    //all: true все поля которые связанны с пользователями будут подтягиваться
    const users = await this.userRepository.findAll({ include: { all: true}})
    return users;
  }

  //проверяем есть ли пользователь с такими данными в базе по емейл и также включаем роли include
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email }, include: { all: true }})
    return user
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      //с помощью ункции add доюавляем еще одно значение
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('User or Role not found', HttpStatus.NOT_FOUND)
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    //добавим проверку если пользователь небыл найден бросим ошибку
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    user.banned = true;
    user.banReason = dto.banReason;
    //сохраняем изменения
    await user.save()
    return user
  }
}
