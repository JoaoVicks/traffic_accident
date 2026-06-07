import { Column, Entity, OneToMany, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Participant } from 'src/participant/entities/participant.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { RoadDirectionEnum } from '../enums/road_direction.enum';
import { LaneConfigurationEnum } from '../enums/lane_configuration.enum';
import { Road } from 'src/road/entities/road.entity';

@Entity()
export class Accident {
  @PrimaryColumn({ type: 'uuid' })
  readonly id!: string;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ type: 'timestamp' })
  time!: Date;

  @Column({ type: 'float' })
  long!: number;

  @Column({ type: 'float' })
  lat!: number;

  @Column()
  coordenate_validity!: boolean;

  @Column({ type: 'enum', enum: RoadDirectionEnum })
  road_direction!: RoadDirectionEnum;

  @Column({ type: 'enum', enum: LaneConfigurationEnum })
  lane_configuration_type!: LaneConfigurationEnum;

  @Column({ type: 'varchar', length: 255 })
  road_geometry!: string; 

  @Column()
  day_phase!: string;

  @Column({ type: 'varchar', length: 255 })
  accident_cause!: string;

  @Column({ type: 'varchar', length: 255 })
  accident_type!: string;

  @Column({ type: 'varchar', length: 255 })
  accident_classification!: string;

  @Column()
  fatalities!: number;

  @Column()
  minor_injuries!: number;

  @Column()
  serious_injuries!: number;

  @Column()
  uninjured_people!: number;

  @Column()
  total_injuries!: number;

  @Column()
  participants_count!: number;

  @Column()
  unknown_condition_count!: number;

  @Column()
  vehicle_count!: number;

  @OneToMany(() => Participant, participant => participant.accident)
  participants!: Participant[];

  @OneToMany(() => Vehicle, vehicle => vehicle.accident)
  vehicles!: Vehicle[];

  @ManyToOne(() => Road, road => road.accidents)
  @JoinColumn({ name: 'road_id' })
  road!: Road;


}
