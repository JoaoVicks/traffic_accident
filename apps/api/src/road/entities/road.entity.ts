import { Accident } from 'src/accident/entities/accident.entity';
import { City } from 'src/city/entities/city.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Road {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ type: 'varchar', length: 10, unique: true })  
  road_code!: string;

  @OneToMany(() => Accident, accident => accident.road)
  accidents!: Accident[];

  @ManyToMany(() => City)
  @JoinTable()
  cities!: City[];
}
