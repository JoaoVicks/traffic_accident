import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { State } from 'src/state/entities/state.entity';
import { JoinColumn } from 'typeorm';

@Entity()
@Unique(['city_name', 'state'])
export class City {
  @PrimaryColumn({ type: 'uuid' })
  readonly id!: string;

  @Column({ type: 'varchar', length: 255 })
  city_name!: string;

  @ManyToOne(() => State, state => state.cities)
  @JoinColumn({ name: 'state_id' })
  state!: State;
}
