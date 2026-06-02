import { Controller } from '@nestjs/common';
import { AccidentService } from './accident.service';

@Controller('accident')
export class AccidentController {
  constructor(private readonly accidentService: AccidentService) {}
}
