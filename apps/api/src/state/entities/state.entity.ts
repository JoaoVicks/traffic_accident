import { Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import { City } from "src/city/entities/city.entity";

@Entity()
export class State {
  @PrimaryColumn({ type: 'uuid' })
  readonly id!:string

  @Column({ type: 'varchar', length: 10, unique: true })
  state_code!: string;

  @OneToMany(() => City, city => city.state)
  cities!: City[];
}