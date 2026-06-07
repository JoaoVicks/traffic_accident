import { Accident } from 'src/accident/entities/accident.entity';
import { Participant } from 'src/participant/entities/participant.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  brand_vehicle!: string;

  @Column()
  fabrication_year!: number;
  
  @Column({ type: 'varchar', length: 255 })
  vehicle_type!: string;

  @ManyToOne(() => Accident, accident => accident.vehicles)
  @JoinColumn({ name: 'accident_id' })
  accident!: Accident

  @OneToMany(() => Participant, participant => participant.vehicle)
  participants!: Participant[];

} 