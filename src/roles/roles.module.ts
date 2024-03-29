import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './user.model';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';
import { Post } from 'src/posts/posts.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles, Post])
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
