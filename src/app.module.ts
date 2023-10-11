import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnoModule } from './turnos/turnos.module';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';
import { TwilioModule } from './twilio/twilio.module';
import { ValoresModule } from './valores/valores.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "b2ntwrjekadzfu9hb7ir-mysql.services.clever-cloud.com",
      port: 3306,
      username: "u6x5wjkxdrm6jusr",
      password: "P6lnT6akABFVw4Xb28XV",
      database: "b2ntwrjekadzfu9hb7ir",
      entities: [
        "dist/**/**.entity{.ts,.js}",
      ],
      synchronize: true
    }),
    TurnoModule,
    MercadoPagoModule,
    TwilioModule,
    ValoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}