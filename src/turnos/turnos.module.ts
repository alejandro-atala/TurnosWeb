// src/turno/turno.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnoController } from './turnos.controller';
import { Turno } from './entities/turno.entity';
import { TurnoService } from './turnos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turno])],
  controllers: [TurnoController],
  providers: [TurnoService],
})
export class TurnoModule {}