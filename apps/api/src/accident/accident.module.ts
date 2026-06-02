import { Module } from '@nestjs/common';
import { AccidentService } from './accident.service';
import { AccidentController } from './accident.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accident } from './entities/accident.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Accident])],
  controllers: [AccidentController],
  providers: [AccidentService],
})
export class AccidentModule {}
