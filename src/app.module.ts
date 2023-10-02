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
      host: "bhlxjhlopqufmvmbz5zw-mysql.services.clever-cloud.com",
      port: 3306,
      username: "u1fps4rq1pygffme",
      password: "7xMZPKXfX7L7WrnqPWHq",
      database: "bhlxjhlopqufmvmbz5zw",
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
