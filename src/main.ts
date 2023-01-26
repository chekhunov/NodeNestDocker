import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ValidationPipe } from './pipes/validation.pipe';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule)

  //swager настройки подклчение
  const config = new DocumentBuilder()
    .setTitle('Nest AUTH')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('Ihor Chekhunov')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)
  //дать доступ только к зарегестрированным users 
  // гвардов может быть много
  // app.useGlobalGuards(JwtAuthGuard);

  //можем передавай любое количество пайпов они будут отрабатывать для каждого ендпоинта
  await app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

}

start()