// src/valores/valor.service.ts
import { Injectable } from '@nestjs/common';
import { Valores } from './entities/valore.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ValoresService {
  constructor(
    @InjectRepository(Valores)
    private valorRepository: Repository<Valores>,
  ) {}

  async findAll(): Promise<Valores[]> {
    return this.valorRepository.find();
  }

  async updateValues(valor: Valores, id :number): Promise<Valores> {
    try {    
      const existingValor = await this.valorRepository.findOne({where:{id}}); // Assuming there's only one record

      // Update the existingValor with the new values
      existingValor.sessionIndividual = valor.sessionIndividual;
      existingValor.sessionGroup = valor.sessionGroup;

      return await this.valorRepository.save(existingValor);
    } catch (error) {
      throw new Error('Error updating values');
    }
  }
}
