import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configura el CORS para permitir solicitudes desde varios orígenes
  app.enableCors({

    origin: ['https://turnospsicologia.000webhostapp.com', 'http://localhost:3001','https://turnos-web-2ab01.web.app','https://app-7549a1e7-113a-4e14-a3af-e0ac112b30b0.cleverapps.io'],

    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();
