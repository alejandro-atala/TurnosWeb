// src/turno/turno.controller.ts
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { TurnoService } from './turnos.service';
import { Turno } from './entities/turno.entity';

@Controller('turnos')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  @Get()
  async findAll(): Promise<Turno[]> {
    return this.turnoService.findAll();
  }

  @Post('reservar')
  async reservar(@Body() eventData: Turno): Promise<Turno> {
    return this.turnoService.reservar(eventData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.turnoService.delete(id);
  }
}
