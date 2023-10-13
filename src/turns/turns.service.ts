import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenTurns } from './entities/genTurns';
import { Repository } from 'typeorm';
import { GenTurnsDto } from './dto/genTurns.dto';

@Injectable()
export class TurnsService {
  constructor(
    @InjectRepository(GenTurns)
    private readonly genTurnsRepository: Repository<GenTurns>,
  ) {}

  async callGenerarTurnos( { fechaInicio, fechaFin, idServicio } : GenTurnsDto): Promise<GenTurns[]> {
    
    console.log('entre')

    // validar que fechaInicio y fechaFin sean fechas
    if (isNaN(Date.parse(fechaInicio))) {
      throw new BadRequestException('La fecha de inicio no es una fecha valida');
    }

    if (isNaN(Date.parse(fechaFin))) {
      throw new BadRequestException('La fecha de fin no es una fecha valida');
    }

    // validar que fechaInicio sea menor a fechaFin
    if (fechaInicio > fechaFin) {
      throw new BadRequestException('La fecha de inicio debe ser menor a la fecha de fin');
    }

    const results = await this.genTurnsRepository.query(`EXEC GenerarTurnos @FechaInicio = "${fechaInicio}", @FechaFin = "${fechaFin}", @IdServicio = ${idServicio}`,);
    return results;
  }
}
