import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { State } from "src/state/entities/state.entity";


@Entity()
export class City{
  @PrimaryColumn({ type: 'uuid' })
  readonly id!:string
  
  @Column({ type: 'varchar', length: 255, unique: true })
  city_name!: string

  @ManyToOne(() => State, state => state.cities)
  state!: State
  
}