// src/valores/valor.controller.ts
import { Controller, Put, Get, Body, HttpStatus, HttpException } from '@nestjs/common';
import { ValoresService } from './valores.service';
import { Valores } from './entities/valore.entity';

@Controller('valores')
export class ValoresController {
  constructor(private readonly valorService: ValoresService) {}

  @Get()
  async findAll(): Promise<Valores[]> {
    try {
      const valores = await this.valorService.findAll();
      return valores;
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  async updateValues(@Body() body: Valores, id:number): Promise<Valores> {
    try {
      const updatedValor = await this.valorService.updateValues(body,id);
      return updatedValor;
    } catch (error) {
      throw new HttpException('Error updating values', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

