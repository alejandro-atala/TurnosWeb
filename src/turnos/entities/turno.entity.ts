// src/turno/turno.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Turno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
  
  @Column()
  email: string;
  
  @Column({ type: 'varchar', length: 15 }) // Asumiendo que un número de teléfono tiene hasta 15 caracteres
  telefono: string;
  

  @Column()
  start: Date;

  @Column()
  end: Date;


  @Column()
  eventId: number ;

  @Column()
  paymentType: string ;

 
}
