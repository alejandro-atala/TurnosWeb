import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configura el CORS para permitir solicitudes desde varios orígenes
  app.enableCors({

    origin: ['https://turnospsicologia.000webhostapp.com', 'http://localhost:3001','https://alejandroatala.000webhostapp.com'],

    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();
