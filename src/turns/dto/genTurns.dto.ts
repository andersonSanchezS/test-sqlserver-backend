import { GenTurns } from '../entities/genTurns';


export class GenTurnsDto extends GenTurns {
    fechaInicio: string;
    fechaFin: string;
    idServicio: number;
}