import { ApiProperty } from '@nestjs/swagger';
import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript'
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({example: '1', description: 'Unique identificator'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example: 'ADMIN', description: 'Unique identificator user'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;
  
  @ApiProperty({example: 'Administrator', description: 'Description administrator'})
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  //указываем с какой сущностью будет связь таблиц чтоб соединить юзера с ролями
  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}