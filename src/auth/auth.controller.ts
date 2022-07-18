import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Autorisation')
@Controller('auth')
export class AuthController {

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {

  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {

  }
}
