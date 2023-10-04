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
      host: "bm0yetkr3k6vu9rarje4-mysql.services.clever-cloud.com",
      port: 3306,
      username: "uncahqiymeja6uj2",
      password: "gs32FqABxC2Rz7D39j4w",
      database: "bm0yetkr3k6vu9rarje4",
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
