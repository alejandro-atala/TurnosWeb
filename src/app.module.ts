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
      host: "monorail.proxy.rlwy.net",
      port: 33659,
      username: "root",
      password: "kObSmhnDSbpIRpWwSlYAjwEdOEuoGLlt",
      database: "railway",
      entities: [
        "dist/**/**.entity{.ts,.js}",
      ],
      synchronize: true
    }),

    // @Module({
    //   imports: [
    //     TypeOrmModule.forRoot({
    //       type: "mysql",
    //       host: "localhost",
    //       port: 3306,
    //       username: "root",
    //       password: "root",
    //       database: "turnero",
    //       entities: [
    //         "dist/**/**.entity{.ts,.js}",
    //       ],
    //       synchronize: true
    //     }),
    TurnoModule,
    MercadoPagoModule,
    TwilioModule,
    ValoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}