import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Need string' })
  readonly value: string;

  //id user add role
  @IsNumber({}, { message: 'Need number' })
  readonly userId: number;
}