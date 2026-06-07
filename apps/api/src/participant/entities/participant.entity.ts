import {
  Entity,
  PrimaryColumn,
  Column,
  Check,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Accident } from 'src/accident/entities/accident.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { GenderEnum } from '../enums/gender.enum';

@Entity()
@Check(`age IS NULL OR (age >= 0 AND age <= 130)`)
export class Participant {
  @PrimaryColumn({ type: 'uuid' })
  readonly id!: string;

  @Column({ type: 'int', nullable: true })
  age!: number;

  @Column({
    type: 'enum',
    enum: GenderEnum,
  })
  gender!: GenderEnum;

  @Column({ type: 'varchar', length: 255 })
  condition!: string;

  @ManyToOne(() => Accident, accident => accident.participants)
  @JoinColumn({ name: 'accident_id' })
  accident!: Accident;

  @ManyToOne(() => Vehicle, vehicle => vehicle.participants, {
    nullable: true,
  })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle!: Vehicle | null;

  @Column()
  participant_type!: string;
}
