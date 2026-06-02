import { Controller } from '@nestjs/common';
import { DataSourceService } from './data_source.service';

@Controller('data-source')
export class DataSourceController {
  constructor(private readonly dataSourceService: DataSourceService) {}
}
