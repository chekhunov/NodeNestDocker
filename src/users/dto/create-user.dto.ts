import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
  @IsString({ message: 'Need string' })
  @IsEmail({}, {message: 'Not correct email'})
  readonly email: string;
  
  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString({ message: 'Need string' })
  @Length(4, 16, {message: 'Not less than 4 and not more than 16'})
  readonly password: string;
}