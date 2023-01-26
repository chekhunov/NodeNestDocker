import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {
  
  constructor(@InjectModel(Post) private postRepository: typeof Post,
  private fileService: FilesService) { }
  
  async create(dto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image)
    //сохраним пост в базу данных но поле image будем перезаписывать потому что нам нужен 
    // не файл а его название
    const post = await this.postRepository.create({...dto, image: fileName})
    return post;
  }
}

