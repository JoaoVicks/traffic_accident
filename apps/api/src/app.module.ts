import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AccidentModule } from './accident/accident.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';
import { RoadModule } from './road/road.module';
import { DataSourceModule } from './data_source/data_source.module';
import { ParticipantModule } from './participant/participant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    AccidentModule,
    VehicleModule,
    CityModule,
    StateModule,
    RoadModule,
    DataSourceModule,
    ParticipantModule,
  ],
})
export class AppModule {}
