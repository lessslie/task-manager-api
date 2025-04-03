import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configuración de seguridad
  app.use(helmet());

  // Prefijo global para todas las rutas
  app.setGlobalPrefix('api');

  // Habilitar CORS
  app.enableCors();

  // Configuración de validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Eliminar propiedades no definidas en los DTOs
      forbidNonWhitelisted: true, // Rechazar peticiones con propiedades no definidas
      transform: true, // Transformar tipos automáticamente
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('API para gestión de tareas con autenticación de usuarios')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Iniciar servidor
  // Intentar usar puerto 3001 si 3000 está ocupado
  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`Aplicación ejecutándose en: http://localhost:${port}/api`);
  console.log(`Documentación disponible en: http://localhost:${port}/api/docs`);
}

void bootstrap();
