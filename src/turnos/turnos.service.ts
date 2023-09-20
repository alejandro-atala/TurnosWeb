// src/turno/turno.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from './entities/turno.entity';

@Injectable()
export class TurnoService {
  constructor(
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
  ) {}

  async findAll(): Promise<Turno[]> {
    return this.turnoRepository.find();
  }

  async reservar(eventData: Turno): Promise<Turno> {
    const formattedEvent = await this.turnoRepository.save(eventData);
    return formattedEvent;
  }

  async delete(id: number): Promise<void> {
    const result = await this.turnoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Turno with ID ${id} not found`);
    }
  }

  async deleteId(id: number): Promise<void> {
    const result = await this.turnoRepository
    .createQueryBuilder()
    .delete()
    .where("eventId = :id", { id })
    .execute();
  
    if (result.affected === 0) {
      throw new NotFoundException(`Turno with ID ${id} not found`);
    }
  }
}
