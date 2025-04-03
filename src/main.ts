import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe
 } from '@nestjs/common';
import {ConfigService} from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar prefijo global de API
  app.setGlobalPrefix('api');

  // Habilitar CORS
  app.enableCors();

  // Configurar pipes de validación globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('API para gestión de tareas con autenticación de usuarios')
    .setVersion('1.0')
    .addTag('auth', 'Endpoints de autenticación')
    .addTag('users', 'Operaciones con usuarios')
    .addTag('tasks', 'Gestión de tareas')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT', 3000);

  await app.listen(port);
  console.log(`Application running on: http://localhost:${port}/api`);
  console.log(
    `API Documentation available at: http://localhost:${port}/api/docs`,
  );
}
void bootstrap();
