import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './user.model';

@Injectable()
export class RolesService {

  //чтоб мы могли добавлять в базу необходимо заинжектить
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {
  }

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto)
    return role
  }

  async getRoleByValue(value: string) {
    //осуществляем поиск 
    const role = await this.roleRepository.findOne({ where: { value } })
    return role
  }
}
