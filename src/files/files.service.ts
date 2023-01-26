import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {

  async createFile(file): Promise<string> {
    try {
      //получаем название файла
      const fileName = uuid.v4() + '.jpg'
      //затем получаем путь к нему идет на шаг вверх '..' там папка static
      //а функция resolve нам все это склеит
      const filePath = path.resolve(__dirname, '..', 'static')
      //если по этому пути нечего нет тогда создаем папку
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer)
      return fileName;
    } catch (error) {
      throw new HttpException('An error occurred while writing the file', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
