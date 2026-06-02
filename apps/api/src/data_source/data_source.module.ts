import { Module } from '@nestjs/common';
import { DataSourceService } from './data_source.service';
import { DataSourceController } from './data_source.controller';

@Module({
  controllers: [DataSourceController],
  providers: [DataSourceService],
})
export class DataSourceModule {}
