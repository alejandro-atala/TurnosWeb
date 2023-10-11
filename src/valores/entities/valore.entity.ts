
// src/turno/turno.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Valores {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sessionIndividual: string;

    @Column()
    sessionGroup: string;

    @Column()
    linkIndividual: string;

    @Column()
    linkGrupal: string;
}
