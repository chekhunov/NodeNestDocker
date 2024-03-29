import { ApiProperty } from '@nestjs/swagger';
import {BelongsToMany, HasMany, Column, DataType, Model, Table} from 'sequelize-typescript'
import { UserRoles } from 'src/roles/user-roles.model';
import { Role } from 'src/roles/user.model';
import { Post } from '../posts/posts.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  
  @ApiProperty({ example: '12345678', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  
  @ApiProperty({ example: 'true', description: 'ban or not ban' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'For bad habits', description: 'Cause block' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  //по скольку один пользователь может иметь большое количество постов используем декоратор HasMany
  @HasMany(() => Post)
  posts: Post[];
}