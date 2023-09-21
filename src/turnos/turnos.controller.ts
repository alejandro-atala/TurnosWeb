// src/turno/turno.controller.ts
import { Controller, Get, Post, Body, Delete, Param, ParseIntPipe } from '@nestjs/common';
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
    console.log(eventData);
    return this.turnoService.reservar(eventData);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.turnoService.delete(id);
  }

  @Delete('borrar/:id')
  async deleteId(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.turnoService.deleteId(id);
  }
}
