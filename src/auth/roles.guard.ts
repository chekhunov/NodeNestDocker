import { CanActivate, ConsoleLogger, ExecutionContext, Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';
import { Console } from 'console';

//если он возвращает false доступ запрещен если true разрешен
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService,
  private reflector: Reflector) { }
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        //для того чтоб рефлектор понимал какие данные ему необходимо доставать
        context.getHandler(),
        context.getClass()
      ])
      if (!requiredRoles) {
        return true
      }
      //получим реквест из контекста
      const req = context.switchToHttp().getRequest()
      const authHeader = req.headers.authorization;
      //тип токена
      const bearer = authHeader.split(' ')[0]
      //сам токен
      const token = authHeader.split(' ')[1]

      //если нам с клиента пришел пустой авторизацион и в нем нет токена и не указан его тип то выбрасываем ошибку
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({message: 'User don\'t authorization'})
      }

      //если все норм то токен надо раскодировать
      const user = this.jwtService.verify(token)
      //после раскодировки помещаем его в реквест и возвращаем true и если мы вернем true
      //то доступ к ендпоинту разрешен
      req.user = user
      return user.roles.some(role => requiredRoles.includes(role.value))
    } catch (e) {
      console.log(e)
      throw new HttpException('No access', HttpStatus.FORBIDDEN)
    }
  }
}