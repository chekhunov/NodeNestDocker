import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    
    const candidate = await this.usersService.getUserByEmail(userDto.email)
    if (candidate) {
      //если при проверке такой кандидат есть в базе значит выбрасываем ошибку
      throw new HttpException('User with same email exists', HttpStatus.BAD_REQUEST)
    }
    //если нет такого мыла то хешируем нового
    //первым параметром пароль передаем вторым соль
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword })
    //генерируем токен на основе данных
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    //создадим обьект пейлоад который будем добавлять во внутрь токена
    const payload = { email: user.email, id: user.id, roles: user.roles }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  //эта функция будет использоваться только внутри сервиса и пробуем получить юзера по его емейлу
  private async validateUser(userDto: CreateUserDto) {
    //получаем юзера
    const user = await this.usersService.getUserByEmail(userDto.email)
    //проверяем пароль с клиента и пароль в базе данных
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
    //если юзер и пароли совпадают тогда возвращаем пользователя
    if (user && passwordEquals) {
      return user
    }
    //или бросаем ошибку авторизации
    throw new UnauthorizedException({message: 'No correct email or password'})
  }
}
