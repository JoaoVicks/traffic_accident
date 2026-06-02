import { Controller } from '@nestjs/common';
import { RoadService } from './road.service';

@Controller('road')
export class RoadController {
  constructor(private readonly roadService: RoadService) {}
}
