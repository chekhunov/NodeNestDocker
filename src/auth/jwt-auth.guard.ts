import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

//если он возвращает false доступ запрещен если true разрешен
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    //получим реквест из контекста
    const req = context.switchToHttp().getRequest()
    try {
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
      return true
    } catch (e) {
      console.log(e)
      throw new UnauthorizedException({message: 'User don\'t authorization'})
    }
  }
}