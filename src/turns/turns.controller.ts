import { Body, Controller, Post } from '@nestjs/common';
import { TurnsService } from './turns.service';
import { GenTurnsDto } from './dto/genTurns.dto';

@Controller('turns')
export class TurnsController {
  constructor(private readonly turnsService: TurnsService) {}

  @Post('/generar')
    async generarTurnos(@Body() body: GenTurnsDto) {
        try {
            const result = await this.turnsService.callGenerarTurnos(body);
            return result;
        } catch (error) {
            return error;
        }
    }
}
